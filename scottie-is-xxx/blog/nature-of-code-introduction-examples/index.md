---
authors: [scottenriquez]
title: "The Nature of Code Companion Series: Introduction Chapter"
date: "2022-07-24"
description: "A companion for the introduction section of Daniel Shiffman's book."
tags: ["Programming"]
---
import RandomWalk from '../../src/components/NatureOfCode/Introduction/randomWalk'
import RandomNormalDistribution from '../../src/components/NatureOfCode/Introduction/randomNormalDistribution'
import BellCurve from '../../src/components/NatureOfCode/Introduction/bellCurve'

## About the Book
Recently, I started reading a fantastic book called *The Nature of Code* by Daniel Shiffman. From the [description](https://natureofcode.com/):
> How can we capture the unpredictable evolutionary and emergent properties of nature in software? How can understanding the mathematical principles behind our physical world help us to create digital worlds? This book focuses on a range of programming strategies and techniques behind computer simulations of natural systems, from elementary concepts in mathematics and physics to more advanced algorithms that enable sophisticated visual results. Readers will progress from building a basic physics engine to creating intelligent moving objects and complex systems, setting the foundation for further experiments in generative design.

Daniel implements numerous examples using a programming language called [Processing](https://processing.org). Instead, I decided to write my own versions using JavaScript, React, Three.js, and D3. For this blog series, I intend to implement my learnings from each chapter. This first post covers the introduction section of the book.

## Random Walk
A random walk traces a path through a Cartesian plane going in a random direction with each step (i.e., one pixel). The walks are built by plotting individual pixels as rectangles in Scalable Vector Graphics (SVGs). The program starts at `(200, 400)` for each walk to represent the center of the Cartesian plane. The `walk` function chooses a random direction and updates the internal state to indicate that a step has been taken.
```javascript
walk(pixels) {
    const step = Math.floor(Math.random() * 4);
    switch (step) {
        case 0:
            this.coordinates.x++;
            break;
        case 1:
            this.coordinates.x--;
            break;
        case 2:
            this.coordinates.y++;
            break;
        default:
            this.coordinates.y--;
            break;
    }
    pixels.push({
        x: this.coordinates.x,
        y: this.coordinates.y
    });
}
```

The `walkWeightedRight` function illustrates the same functionality but with a non-uniform distribution. In this code, there's a 70% chance of moving to the right.
```javascript
walkWeightedRight(pixels) {
    const step = Math.floor(Math.random() * 10);
    if (step <= 6) {
        this.coordinates.x++;
    }
    else if (step === 7) {
        this.coordinates.x--;
    }
    else if (step === 8) {
        this.coordinates.y++;
    }
    else {
        this.coordinates.y--;
    }
    pixels.push({
        x: this.coordinates.x,
        y: this.coordinates.y
    });
}
```

The `randomWalk` function calls the `walk` or `walkWeightedRight` function until an edge is hit. The SVG is then rendered based on the pixels stored in memory representing the path.
```javascript
randomWalk(weightedRight) {
    const pixels = [];
    this.steps.current = 0;
    while (this.steps.current <= this.steps.max &&
        this.coordinates.x < width - 1 && this.coordinates.x > 0
        && this.coordinates.y < height - 1
        && this.coordinates.y > 0)
    {
        if (weightedRight) {
            this.walkWeightedRight(pixels);
        }
        else {
            this.walk(pixels);
        }
        this.steps.current++;
    }
    return pixels;
}
```
The random walks are capped at 10,000 pixels for performance reasons.
<div>
    <RandomWalk weightedRight={false} buttonText={'Random Walk'}/>
</div>
<br />
<div>
    <RandomWalk weightedRight={true} buttonText={'Random Walk Weighted Right'}/>
</div>

## Random Numbers with Normal Distribution
This example plots random numbers generated with a normal distribution (i.e., no specific weights).

```javascript
generateRandomData() {
    const datasetSize = 100;
    const maxValue = 100;
    const data = [];
    for(let index = 0; index < datasetSize; index++) {
        data[index] = {
            index: index,
            value: Math.floor(Math.random() * maxValue)
        }
    }
    return data;
}
```

<div>
    <RandomNormalDistribution />
</div>

## Bell Curve (Frequency Distribution)
This example shows how to create a bell curve for one thousand monkeys ranging in height from 200 to 300 pixels with a normal distribution. First, the code generates the data.

```javascript
generateHeightData() {
    const data = [];
    const datasetSize = 1000;
    const baseHeight = 200;
    const maxRandomValue = 100;
    for(let index = 0; index < datasetSize; index++) {
        data[index] = {
            index: index,
            // generate a height between 200 and 300
            value: baseHeight + (Math.floor(Math.random() * maxRandomValue))
        }
    }
    return data.sort((current, next) => { return current.value - next.value });
}
```

Next, the code computes the standard deviation.

```javascript
computeMean(array) {
    let sum = 0;
    for(let index = 0; index < array.length; index++) {
        sum += array[index].value;
    }
    return sum / array.length;
}

computeStandardDeviation(data, mean) {
    let sumSquareDeviation = 0;
    for(let index = 0; index < data.length; index++) {
        sumSquareDeviation += Math.pow(data[index].value - mean, 2);
    }
    return Math.sqrt(sumSquareDeviation / data.length);
}
```

Lastly, the code groups each monkey by standard deviations for the x-axis and plots the frequency counts for the y-axis.

```javascript
generateHeightBellCurve() {
    const data = this.generateHeightData();
    const meanHeight = this.computeMean(data);
    const standardDeviationHeight = this.computeStandardDeviation(data, meanHeight);
    const bellCurveData = {};
    for(let index = 0; index < data.length; index++) {
        data[index].standardDeviations = Math.round((data[index].value - meanHeight) / standardDeviationHeight);
        if(!bellCurveData[data[index].standardDeviations]) {
            bellCurveData[data[index].standardDeviations] = {
                standardDeviations: data[index].standardDeviations,
                count: 1
            }
        }
        else {
            bellCurveData[data[index].standardDeviations].count++;
        }
    }
    return Object.keys(bellCurveData).map(key => bellCurveData[key]).sort((one, other) => { return one.standardDeviations - other.standardDeviations });
}
```

<div>
    <BellCurve />
</div>

## Next Section
[Chapter one](https://scottie.is/writing/nature-of-code-chapter-one-examples) explores Euclidean vectors and the basics of motion.