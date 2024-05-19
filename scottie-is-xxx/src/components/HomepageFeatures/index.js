import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Link from "@docusaurus/core/lib/client/exports/Link";

const FeatureList = [
  {
    title: 'About Me',
    Svg: require('@site/static/img/scott-s.svg').default,
    description: (
      <>
          I'm a cloud solutions architect, software engineer, and computer scientist. I live in Los Angeles, California and currently work for Amazon Web Services.
      </>
    ),
  },
  {
    title: 'Cloud and Coding',
    Svg: require('@site/static/img/code-c.svg').default,
    description: (
      <>
        I'm a graduate of the University of Texas at Austin with degrees in computer science and Asian studies. I also have over 10 total AWS, Azure, and HashiCorp certifications. I've worked in tech for over 10 years across disciplines including software engineering, cloud engineering, DevOps engineering, and consulting. See my <Link href={'/files/resume.pdf'} target={'_blank'}>resume</Link> for more details.
      </>
    ),
  },
  {
    title: 'Blog',
    Svg: require('@site/static/img/blog-b.svg').default,
    description: (
      <>
        I started writing <Link href={'/writing'}>this blog</Link> in 2012 as an undergraduate student. I enjoy musing about technology, travel, and life in general.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <br/>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <br/>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
