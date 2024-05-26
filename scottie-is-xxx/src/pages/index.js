import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBlog, faFilePdf } from "@fortawesome/free-solid-svg-icons"
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons"
import Link from "@docusaurus/core/lib/client/exports/Link";

const HomeContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const NameContainer = styled.div`
    text-align: center;
`;

const Name = styled.h1`
    font-family: 'JetBrains Mono', monospace;
    font-size: 3rem;
    margin: 0;
`;

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (<Layout
    title={`Homepage`}
    description="Scottie Enriquez">
    <main>
      <HomeContainer>
        <NameContainer>
          <Name>Scottie Enriquez</Name>
          <p>Cloud solutions architect, software engineer, and computer scientist in Los Angeles, California</p>
          <Link to={'/writing'}><FontAwesomeIcon icon={faBlog} size={'2x'} /></Link> <Link to={'/files/resume.pdf'} target={'_blank'}><FontAwesomeIcon icon={faFilePdf} size={'2x'} /></Link> <Link to={'https://github.com/scottenriquez'}><FontAwesomeIcon icon={faGithub} size={'2x'} /></Link> <Link to={'https://www.linkedin.com/in/scottenriquez/'}><FontAwesomeIcon icon={faLinkedin} size={'2x'} /></Link>
        </NameContainer>
      </HomeContainer>
    </main>
  </Layout>);
}
