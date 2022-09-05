import { ReactComponent as RsLogo } from '../../assets/icons/rs-logo.svg';
import { ReactComponent as GitLogo } from '../../assets/icons/github-icon.svg';
import AboutUs from './AboutUs';
import './footer.scss';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="rsschool-icon">
                <a className="rsschool-link" href="https://rs.school/react/" target="_blank" rel="noopener noreferrer">
                    <RsLogo fill="black" />
                </a>
            </div>
            <div className="year">2022 год</div>
            <div className="developers">
                {AboutUs.map((el) => {
                    return (
                        <a
                            key={el.key.toString()}
                            href={el.gitHub}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="developers-git"
                        >
                            {el.name}
                            <GitLogo fill="black" style={{ background: 'white', borderRadius: '25px' }} />
                        </a>
                    );
                })}
            </div>
        </footer>
    );
};

export default Footer;
