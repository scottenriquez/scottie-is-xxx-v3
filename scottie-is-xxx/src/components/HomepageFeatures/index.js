import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'About Me',
    Svg: require('@site/static/img/scott-s.svg').default,
    description: (
      <>
          I'm a cloud solutions architect, software engineer, and occasional nomad. I currently work for Amazon Web Services.
      </>
    ),
  },
  {
    title: 'Cloud and Coding',
    Svg: require('@site/static/img/code-c.svg').default,
    description: (
      <>
        I'm a graduate of the University of Texas at Austin with degrees in computer science and Asian studies. I also have over 10 AWS, Azure, and HashiCorp certifications. I've been working in tech for over 10 years across disciplines including software engineering, cloud engineering, DevOps engineering, and consulting.
      </>
    ),
  },
  {
    title: 'Blog',
    Svg: require('@site/static/img/blog-b.svg').default,
    description: (
      <>
        I started writing this blog in 2012 as an undergraduate student. I enjoy musing about technology, travel, and life in general.
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
