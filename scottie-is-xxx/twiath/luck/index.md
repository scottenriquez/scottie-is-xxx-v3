---
title: "Analyzing Luck in the League's Recent History (WIP)"
date: "2024-08-15"
description: "Determining who is the luckiest person in the league."
authors: [scottie, callen]
tags: ["Blog", "Data"]
---

import TeamPointsBarGraph from '../../src/components/FantasyFootball/LuckAnalysis/teamPointsBarGraph'

## Background
The Winner Is a Tryhard, affectionately known as TWIATH, began in 2014 and has been going strong ever since. We started our journey on ESPN before migrating to Sleeper in 2020. A few years ago, ESPN quietly deleted many leagues' histories without warning, including ours. We had previously stored some historical data in an EBS snapshot in AWS, but sadly, we haven't been able to recover the full dataset. Since Sleeper provides an API for accessing data (and most of us are nerds who work as technology professionals), I opted to use this to create a data lake in AWS to prevent this from happening again. More importantly, I wanted to use this data to start answering some important questions, such as, who is the luckiest person in league history?

## Building an Initial Data Lake Using Python 
Before answering any questions, we must first build our dataset. Thankfully, Sleeper offers [an API](https://docs.sleeper.com/) to pull data programmatically. Numerous [Python wrapper](https://pypi.org/project/sleeper-py/) packages are available to accelerate development. With object storage like Amazon S3 to store the data, it only takes a bit of Python code to get started. With `pandas`, `pyarrow`, and `sleeper-py` installed via `pip`, the following code establishes the base dataset as Parquet files uploaded to S3:

```python title='twiath-datalake-prep/historical-sleeper-load.ipynb'
# update with your S3 bucket name
base_s3_path = 's3://your-bucket-name/sleeper'
# get the leauge IDs from your Sleeper leauge's URL
# there is one ID per season
past_league_ids = ['541384381865115648', '706690303247065088','784536701455429632','961113588070985728']
for index, league_id in enumerate(past_league_ids):
    # as noted above, we migrated to Sleeper in 2020
    # update this value with the first year in Sleeper
    year = index + 2020
    # fetch the league members
    rosters = pd.DataFrame(Leagues.get_rosters(league_id))
    # there should only be 18 weeks, but I've set this to 20 in case there are more weeks added in the future
    for week in range(1, 20):
        # fetch the matchups from the Sleeper API
        matchups = pd.DataFrame(Leagues.get_matchups(league_id, week))
        if not matchups.empty:
            # join rosters and matchups
            week_result = pd.merge(rosters, matchups, on='roster_id', how='inner')
            # set week and year values
            week_result['week'] = week
            week_result['year'] = year
            # determine which weeks are regular season and which are playoffs
            # these API endpoints do not have this metadata
            if year == 2020:
                if week <= 13:
                    week_result['type'] = 'regular'
                else:
                    week_result['type'] = 'playoff'
            else:
                if week <= 14:
                    week_result['type'] = 'regular'
                else:
                    week_result['type'] = 'playoff'
            players_points_list = []
            # format the player points to support Parquet
            for players_points_week in week_result['players_points'].to_list():
                players_points_list.append([{'player_id': player_id, 'points': points} for player_id, points in players_points_week.items()])
            week_result['players_points'] = players_points_list
            # drop columns that cause issues with Parquet
            week_result = week_result.drop(columns=['settings', 'metadata'])
            # write partitioned file to S3
            week_result.to_parquet(f'{base_s3_path}/matchups/{year}/{week}/result.parquet', engine='pyarrow')
```

For a complete Jupyter Notebook example, see [this GitHub repository](https://github.com/the-winner-is-a-tryhard/datalake-creation/blob/main/twiath-datalake-prep/historical-sleeper-load.ipynb). This does not follow data lake best practices like a [medallion architecture](https://www.databricks.com/glossary/medallion-architecture). Still, it's enough to start analyzing the entire Sleeper's historical dataset. In a later post, we'll cover our scheduled jobs to load the data weekly during the season.

## Scoring
To provide additional context for the numbers shown for those outside the league:
- 12 teams
- Half-point per reception
- One-point receiving first down
- Quarter-point loss per point for defenses
- Half-point sacks
- No kickers (sadly)
- Two WR/RB/TE flex spots

## A Naive Attempt at Defining Luck and Skill
In the simplest terms, you might define luck as the fewest points against (PA) since you have no control over your opponent's lineup. By the same logic, you could define skill as points for (PF), since you chose the players on your roster. Let's start with regular season PF in the past four seasons:

<TeamPointsBarGraph teamPointsData={[{'team': 'Scottie', 'points': 5779.41}, {'team': 'Callen', 'points': 5687.97}, {'team': 'Travis', 'points': 5613.28}, {'team': 'Mark', 'points': 5570.6}, {'team': 'Caleb', 'points': 5510.96}, {'team': 'Andrew', 'points': 5510.57}, {'team': 'Matt', 'points': 5413.31}, {'team': 'John', 'points': 5406.19}, {'team': 'Carl', 'points': 5377.96}, {'team': 'Chris', 'points': 5371.52}, {'team': 'Trond', 'points': 5289.02}, {'team': 'Logan', 'points': 4995.96}]} />

Let's convert these to weekly averages:

<TeamPointsBarGraph teamPointsData={[{'team': 'Scottie', 'points': 103.20375}, {'team': 'Callen', 'points': 101.57089285714287}, {'team': 'Travis', 'points': 100.23714285714286}, {'team': 'Mark', 'points': 99.47500000000001}, {'team': 'Caleb', 'points': 98.41}, {'team': 'Andrew', 'points': 98.4030357142857}, {'team': 'Matt', 'points': 96.66625}, {'team': 'John', 'points': 96.53910714285713}, {'team': 'Carl', 'points': 96.035}, {'team': 'Chris', 'points': 95.92}, {'team': 'Trond', 'points': 94.44678571428572}, {'team': 'Logan', 'points': 89.21357142857143}]} />

So, does regular season PF correlate with championships? For the most part, yes. The past four champions were Mark (2023), Mark (2022), Matt (2021), and Travis (2020). Despite consistently leading the league in PF, Scottie and Callen have yet to win a championship (although Scottie did lose in the finals twice during these four seasons). Mark and Travis are in the top four scorers, and Matt's championship season looks like an outlier compared with his average performance. With this in mind, does regular season PA correlate better with championships? 

<TeamPointsBarGraph teamPointsData={[{'team': 'Carl', 'points': 94.96428571428571}, {'team': 'Mark', 'points': 95.26017857142857}, {'team': 'Scottie', 'points': 95.90857142857143}, {'team': 'Caleb', 'points': 96.14196428571428}, {'team': 'John', 'points': 96.385}, {'team': 'Andrew', 'points': 96.49428571428572}, {'team': 'Logan', 'points': 96.59375}, {'team': 'Travis', 'points': 97.43410714285714}, {'team': 'Trond', 'points': 99.42482142857143}, {'team': 'Chris', 'points': 100.16660714285715}, {'team': 'Callen', 'points': 100.62839285714287}, {'team': 'Matt', 'points': 100.71857142857142}]} />

Not quite as well. First of all, weekly PF ranges (89.2 to 103.2) have a higher minimum/maximum delta than PA ranges (95.0 to 100.7). While we see Mark and Scottie in the bottom three (i.e., luckiest), Matt has the highest PA (average and total). In any case, these aggregates omit much of the story. To do so, let's examine a season in more detail and introduce a new metric.

## Measuring Wins Against All Opponents
The core aspect of luck in fantasy football is scheduling and PA for a given week. For example, in our 12-team league, you could be the second-highest-scoring team and still lose the week. Likewise, you could put up the second-worst performance and win the week. Aggregating the totals for PA and PF does not account for this. However, we can measure how many teams you would have beaten in the given week to measure this: 

$$
f(r) = ∑_{p ∈ P(r)} I(p < r.points)
$$

Where:
- $$P(r)$$ is the set of points from all other players in the same year and week as $$r$$, defined as:
- $$P(r) = {p | (p.year = r.year) ∧ (p.week = r.week) ∧ (p.username ≠ r.username)}$$
- $$I(condition)$$ is the indicator function, defined as: $$I(condition) = { 1 \text{ if true } 0 \text{ if false } }$$
- $$r.points$$ represents the points of the input row

Or expressed in Python with the Pandas `DataFrame`:
```python
# assumes that the data lake Parquet files have been read into a DataFrame called matchups
def calculate_weekly_wins_against_all_opponents(row):
    other_player_points = list(matchups.loc[matchups['year'] == row['year']].loc[matchups['week'] == row['week']].loc[matchups['username'] != row['username']]['points'])
    wins_against_all_opponents = 0.0
    for other_player_point in other_player_points:
        if other_player_point < row['points']:
            wins_against_all_opponents += 1
    return wins_against_all_opponents
matchups['wins_against_all_opponents'] = matchups.apply(calculate_weekly_wins_against_all_opponents, axis=1)
```

<TeamPointsBarGraph teamPointsData={[{'team': 'Scottie', 'points': 6.125}, {'team': 'Travis', 'points': 6.107142857142857}, {'team': 'Callen', 'points': 6.071428571428571}, {'team': 'Caleb', 'points': 5.660714285714286}, {'team': 'Mark', 'points': 5.642857142857143}, {'team': 'Matt', 'points': 5.517857142857143}, {'team': 'Andrew', 'points': 5.446428571428571}, {'team': 'Carl', 'points': 5.267857142857143}, {'team': 'Chris', 'points': 5.071428571428571}, {'team': 'John', 'points': 5.071428571428571}, {'team': 'Trond', 'points': 4.517857142857143}, {'team': 'Logan', 'points': 4.303571428571429}]} />

This function produces an integer between 0 and 11 for any given week. When looking at the regular season averages over the past four years, we see the order shift slightly in the middle. However, over time, this metric correlates with PF. At the top, Scottie leads this metric. At the bottom, Logan's low PF and average PA hurt him again. How about during a smaller time window (e.g., a single season)? Can we identify who had a lucky season?

# Quantifying the Luckiest Seasons

Using Pandas, we can query the total number of wins and wins against all opponents and group by player and season to create a ratio.

```python
matchups.loc[matchups['type'] == 'regular'].groupby(['username', 'year']).agg({'actual_win_loss':'sum','wins_against_all_opponents':'sum'})
```

We can identify anomalous seasons by comparing the actual wins to the number of teams the player would have beaten. The higher the percentage, the more lucky the player was. The lower the percentage, the more unlucky the player was. Let's look at the top five luckiest seasons:

| Name   | Season | Actual Wins      | Wins Against Against All Opponents       | Ratio |
|--------|--------|------------------|------------------------------------------|-------|
| Andrew | 2022   | 10               | 61                                       | 16%   |
| Mark   | 2023   | 10               | 67                                       | 15%   |
| Logan  | 2023   | 7                | 52                                       | 13%   |
| Carl   | 2023   | 9                | 73                                       | 12%   |
| Carl   | 2020   | 10               | 83                                       | 12%   |

And the bottom five seasons:

| Name  | Season | Actual Wins      | Wins Against Against All Opponents       | Ratio |
|-------|--------|------------------|------------------------------------------|-------|
| Carl  | 2022   | 5                | 73                                       | 7%    |
| Trond | 2021   | 3                | 44                                       | 7%    |
| John  | 2023   | 5                | 77                                       | 6%    |
| Caleb | 2022   | 5                | 79                                       | 6%    |
| Trond | 2023   | 3                | 59                                       | 5%    |

Caleb's 2022 squad outscored 79 opponents, while Andrew's 2022 team outscored 61. Andrew ended up with ten wins, thus marking the luckiest season in the league's history.