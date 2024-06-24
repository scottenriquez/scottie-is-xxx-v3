import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBlog, faFilePdf, faFootball } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import Link from '@docusaurus/core/lib/client/exports/Link';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (<Layout
    title={`Homepage`}
    description='Scottie Enriquez'>
    <main>
      <div className={'home-container'}>
        <div className="container">
          <div className={'text--center'}>
            <h1 className={'styled-name'}>Scottie Enriquez</h1>
          </div>
          <div className={'text--center'}>
            <p>Cloud solutions architect, software engineer, and computer scientist in Los Angeles, California</p>
          </div>
          <div className={'text--center'}>
            <Link to={'/files/resume.pdf'} target={'_blank'}><FontAwesomeIcon
              icon={faFilePdf} size={'2x'}/></Link> <Link to={'/writing'}><FontAwesomeIcon icon={faBlog} size={'2x'}/></Link> <Link to={'/discussing-fantasy-football'}><FontAwesomeIcon icon={faFootball} size={'2x'}/></Link> <Link to={'https://github.com/scottenriquez'}><FontAwesomeIcon icon={faGithub} size={'2x'}/></Link> <Link to={'https://www.linkedin.com/in/scottenriquez/'}><FontAwesomeIcon icon={faLinkedin} size={'2x'}/></Link>
          </div>
        </div>
      </div>
    </main>
  </Layout>);
}
