---
authors: [scottenriquez]
title: Becoming More Human in an Increasingly AI World 
date: "2025-04-25"
description: ""
tags: ["Personal", "Technology"]
---

I'm tired. Existentially.

As a senior engineer with nearly 13 years of professional experience, I've reinvented myself countless times. I've seen more technologies than I can count or remember come and go. I've seen bubbles form and burst. I remember when the latest flop was supposed to be the next big thing. I've spent countless hours learning new skills and honing my craft in a knowingly futile effort to stay up-to-date with technology. I've seen layoffs and downturns. Trust me. I understand that the macroeconomics of the tech industry has peaks and valleys. After all, I wrote my first `Hello, world!` in high school in 2004 shortly after the `.com` crash. However, something feels different this time. I'm starting to feel more and more concerned and disillusioned.

## Goodhart's Law
I will refer to the concept of Goodhart's Law a few times throughout this post, so I'll quickly define my interpretation. It states that:
> Any observed statistical regularity will tend to collapse once pressure is placed upon it for control purposes.

Or, in layperson's terms (which I strongly prefer):
> When a measure becomes a target, it ceases to be a good measure.

I think about this adage almost every single day. It's no secret that Amazon is one of the most data-driven companies on the planet. During my tenure at AWS, I wrote numerous docs overflowing with quantitative evidence to support my claims and proposals. As a customer-facing solutions architect, data was integral to guiding my customers on the right path and measuring the efficacy of my work. That said, Amazonians are also expected to balance the data with anecdotes. Like Jeff Bezos famously said back in 2018:

> The thing I have noticed is that when the anecdotes and the data disagree, the anecdotes are usually right. There is something wrong with the way that you are measuring it.

I remember my professors at university telling stories of how programmers back in the day used to have their productivity measured by various arbitrary metrics like program execution duration, lines of code, etc. When these metrics become targets, other arguably more meaningful metrics like code maintainability quickly suffer.

Exhibit A:
```typescript title='terribleAddFunction.ts'
const add = async (first: number, second: number): Promise<number> => {
    const sleep = (millisecondsToWait: number): Promise<void> => {
        return new Promise(resolve => setTimeout(resolve, millisecondsToWait));
    };
    // waste five minutes of runtime
    await sleep(300000);
    return first + second;
}
```

Exhibit B:
```typescript title='terribleIfFunction.ts'
// replace
// condition ? truePathReturn : falsePathReturn
// with extra lines
// add comments for even more lines
const ifWithExtraLines = (condition: Boolean, truePathReturn: object, falsePathReturn: object): object => {
    // check condition
    if (condition) {
        // return true path object if condition is true
        return truePathReturn;
    }
    else {
        // return false path object if condition is false
        return falsePathReturn;
    }
}
```

You get the idea. These code snippets are terrible, but if developers' targets are runtime or the number of lines, this is the type of software that is incentivized. Goodhart's Law.

## Vestigial Structures 
As the tech industry has narrowed its focus and investments on AI lately, I can't help but feel even less human. I'm constantly bombarded with the (likely) sensationalized idea that developers will soon be replaced. Programmers will become vestigial structures, casualties of the rise of AI agents, and ironically, the very source of data that will lead to our own demise. While I am skeptical about just how close humans are to achieving AGI (artificial general intelligence), there's no doubt that we are approaching a critical juncture in technological history. I'm also not convinced that we're considering the right metrics.

## Developer Productivity Is Not for You
I'm not going to masquerade as some genius economist, but let's consider stock price as an example of a target for a moment. Everyone can agree that this is a meaningful metric, but I argue that this is a short-term target. Why are executives paid primarily via stock? So their focus is to raise the stock price, of course. Typically, vest periods of a few years ensure no short-term stock manipulation (though things like stock buybacks infuriate me). However, they have a clear target and timeline. Leadership now indexes on this. Many other metrics, such as the company's long-term performance, employee satisfaction, sustainability, etc., are less of a focus because they impact their target (i.e., the company's stock price a few years out) far less. Now, most employees are constantly laser-focused on short-term growth in perpetuity. Goodhart's Law in action.

With the advent of large language models (LLMs) and AI agents, there are typically two value propositions: hire fewer developers and/or materially augment their output. While we can debate just how much the productivity gains are, tools like these undoubtedly help developers like me ship features faster than ever. But have you ever asked yourself who benefits from these productivity gains? In theory, these productivity gains mean more features. More features correlate to more revenue. More revenue sways the market. The market support bolsters the stock price. So simply put, your employer and its shareholders benefit from your increased productivity as a developer. Developer productivity is not for you.

While I use these tools daily for tasks like explaining code I did not write, I have no idea how this will impact our skills and cognitive sharpness in the long term. These tools certainly make me more productive in the short term, but they may not make me a better programmer. That is the key distinction because one benefits my employer, and the other benefits me as a worker. Developer upskilling distinctly differs from developer productivity.

## We Gave Away the Knowledge for Free (Under MIT)
I also won't parade myself around as an open-source purist. The lion's share of the software I've authored resides under the lock and key of my megacorporate employers' private repositories. That said, I never imagined that all the code I (and much more so the actual open-source contributors) published freely on the internet would benefit a select few companies later, back when I signed up for my GitHub account over a decade ago. While access to these models is democratized for a fee, creating these massive models is limited to the select few corporate titans with the means of production (mountains of GPUs, barring revolutionary advancements in the vein of DeepSeek).

While these technological advancements are truly remarkable, I still struggle with the ethics of using these large models at times. Without namedropping any company or model, you can find countless lawsuits from creators who have coaxed significant portions of their works out of LLMs and diffusion models. These cases are ample evidence, in my opinion, that the macroeconomic corporate stance is to ask for forgiveness, not permission, for what content is acceptable to train models on. 

Ultimately, we gave away the knowledge for free, but now we have to pay for access to its application. When I look at the jobs that are most at risk of being diminished by AI, they are mostly well-paying jobs in a rapidly vanishing middle class (e.g., developers) or creative fields like graphic design. To quote the [brilliant tweet](https://x.com/QuinnCat13/status/1609711617062703104) of `@QuinnCat3`:

> We could automate menial jobs so people have time to make art and music, but apparently, we'd rather automate art and music so people have time for menial jobs.

Software like [Glaze](https://glaze.cs.uchicago.edu/what-is-glaze.html), which adds minor modifications to images that are imperceptible to the human eye but makes it more difficult for models to train on, gives me hope for checks, balances, and enforcement in AI ethics. However, these powerful models already exist. Remediation is much more challenging than prevention.

## A Focus on Humanity
Believe it or not, this post started as a therapy exercise. I've been struggling lately to define my worth, identity, and goodness as a human being without relying on my career accolades, the perceived prestige of the company I work for, the quality of my education, etc. When I look to others for inspiration online, I see the same qualities: braggadocious reflections about their many followers, indie makers plastering their incomes on their profiles, toxic elitism, etc. All the targets that we've been conditioned to optimize for.

I don't blog often, but I felt inspired to write about my frustrations with the industry, society, and myself. I still have a genuine love of technology and am grateful that my career revolves around this passion, a privilege I do not take for granted. However, now more than ever, it's time for me to relinquish some of that competitive, capitalistic vanity and reconnect with my own humanity. I simply do not care about constant improvement, revenue growth, external validation, etc., like I used to. I want to spend more time creating for myself, learning for fun, exploring some sort of spirituality or connection with the natural world, and investing time in things that make the world a slightly better place.

I spent years volunteer teaching AP computer science at inner-city high schools through a program called [TEALS](https://www.microsoft.com/en-us/teals). I attend local meetups here in Los Angeles and try to mentor less experienced developers. However, I haven't done nearly as good of a job lately due to internal and external pressures to focus on career productivity and general fatigue with the industry. Whether due to AI-driven productivity, interest rates, or whatever, seeing numerous close friends of mine struggle to find work despite seemingly infinite job postings has made me believe much less in the stability and sustainability of our profession (though I suspect the tech sector is far from the only trade feeling this).

I have no power to make changes on a massive scale. Like most people, I'm a minuscule cog in this intricate and profoundly unfair machine. I can offer up my authentic self, though. I can share my tiny voice that questions the ethics and benefits of the technology that we know and use. I can acknowledge that the human anecdote doesn't align with the data that shows economic growth. I can share my journey to define my own self-worth and goodness without the quantitative pressure of comparing myself to others. I can strive to be more human in an increasingly AI world.

## Disclaimer
At the time of writing this blog post, I currently work for Amazon Web Services. The opinions and views expressed here are my own and not the views of my employer.