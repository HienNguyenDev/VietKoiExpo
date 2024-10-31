import React from 'react';
import { Typography, Button, Card } from 'antd';
import Countdown from 'react-countdown';
import styles from './LandingPage.module.scss';

const LandingPage = () => {
  const countdownRenderer = ({ days, hours, minutes, seconds }) => (
    <div className={styles.countdown}>
      <span>{days}d</span> <span>{hours}h</span> <span>{minutes}m</span> <span>{seconds}s</span>
    </div>
  );

  return (
    <div className={styles.landingPage}>
      <div className={styles.heroSection}>
        <Typography.Title level={1}>Welcome to the Koi Fish Competition</Typography.Title>
        <Typography.Paragraph>
          Join us for an exciting competition showcasing the most beautiful Koi fish.
        </Typography.Paragraph>
        <Button type="primary" href="/competition">Go to Competition</Button>
      </div>
      <div className={styles.aboutSection}>
        <Card title="About the Competition">
          <Typography.Paragraph>
            The Koi Fish Competition is an annual event where Koi enthusiasts from around the world showcase their prized fish.
          </Typography.Paragraph>
          <Typography.Paragraph>
            Key Dates: 
            <ul>
              <li>Registration: Jan 1 - Feb 28</li>
              <li>Competition Start: Mar 15</li>
              <li>Finals: Apr 20</li>
            </ul>
          </Typography.Paragraph>
        </Card>
      </div>
      <div className={styles.countdownSection}>
        <Typography.Title level={2}>Next Event Starts In:</Typography.Title>
        <Countdown date={Date.now() + 1000000000} renderer={countdownRenderer} />
      </div>
    </div>
  );
};

export default LandingPage;