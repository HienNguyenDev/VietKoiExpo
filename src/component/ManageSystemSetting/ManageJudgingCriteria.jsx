import React from 'react';
import { Typography, List, Divider, Card, Steps } from 'antd';

const { Title, Paragraph, Text } = Typography;
const { Step } = Steps;

const ManageJudgingCriteria = () => {
  return (
    <div >
      <Card style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
        <Typography>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>Koi Judging Criteria & Categories</Title>
          <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
            In Koi fish competitions, the beauty and quality of each fish is carefully evaluated by expert judges. 
            The judging process is based on three essential criteria. Let’s walk through the steps on how these Koi fish are judged, 
            with the most stunning Koi emerging as the winner. 
          </Paragraph>

          <Divider />

          <Title level={4}>Step-by-Step Judging Process:</Title>

          <Steps direction="vertical" size="default" current={3}>
            <Step
              title="Step 1: Evaluating the Shape (50%)"
              description={
                <Paragraph>
                  The first and most important criterion is the <Text strong>shape</Text> of the Koi fish. Judges carefully examine 
                  the overall body structure, ensuring that the fish has a balanced and proportionate form. The ideal Koi should have 
                  a smooth, streamlined body that is symmetrical from head to tail. Any deformities or imperfections in shape 
                  will result in a lower score. Shape carries the most weight, accounting for <Text strong>50%</Text> of the total score.
                </Paragraph>
              }
            />
            <Step
              title="Step 2: Analyzing the Color (30%)"
              description={
                <Paragraph>
                  The second criterion is <Text strong>color</Text>, which makes up <Text strong>30%</Text> of the score. Judges look 
                  for vivid, deep, and vibrant colors that stand out. The color must be consistent across the entire body, 
                  with no fading or irregularities. A Koi with striking and pure colors will score highly in this category.
                </Paragraph>
              }
            />
            <Step
              title="Step 3: Assessing the Pattern (20%)"
              description={
                <Paragraph>
                  The last criterion is the <Text strong>pattern</Text> of the Koi, contributing <Text strong>20%</Text> to the overall score. 
                  The pattern is all about the unique arrangement of colors across the fish’s body. Judges prefer Koi that display 
                  symmetry and balance in their patterns, with clean and well-defined borders between different color areas. 
                  A beautifully patterned Koi can elevate its aesthetic appeal significantly.
                </Paragraph>
              }
            />
          </Steps>

          <Divider />

          <Title level={4}>Final Result Calculation:</Title>
          <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
            Once each judge has scored the Koi in all three categories, the final score is calculated. There are a few methods 
            to determine the winner:
          </Paragraph>
          <List
            header={<Text strong>Common Methods to Determine the Final Result:</Text>}
            bordered
            dataSource={[
              'Highest total score across all judges.',
              'The Koi with the most number of high scores in individual categories.',
              'Weighted average score combining all criteria scores based on their percentage weight (50% shape, 30% color, 20% pattern).'
            ]}
            renderItem={item => <List.Item>{item}</List.Item>}
          />

          <Divider />

          <Title level={4}>Automatic Category Assignment:</Title>
          <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
            Each Koi fish will be automatically assigned to one of six competition categories based on predefined criteria. The assignment 
            considers three main factors: <Text strong>variety (species)</Text>, <Text strong>size</Text>, and <Text strong>age</Text>. These categories ensure fair competition by grouping Koi with similar characteristics together.
          </Paragraph>

          <List
            header={<Text strong>Competition Categories:</Text>}
            bordered
            dataSource={[
              'Grand Champion - The most prestigious award, given to the overall best Koi fish.',
              'Sakura Champion - Awarded to the best Koi fish within the "Sakura" variety.',
              'Mature Champion - Given to the best Koi fish in the "Mature" category (larger, older fish).',
              'Adult Champion - Best Koi in the adult age group.',
              'Young Champion - Best Koi in the young category, focusing on promising future champions.',
              'Baby Champion - Awarded to the best young Koi, showcasing potential for future growth and beauty.'
            ]}
            renderItem={item => <List.Item>{item}</List.Item>}
          />

          <Paragraph style={{ marginTop: '20px', fontSize: '16px', lineHeight: '1.6' }}>
            The assignment is based on the following criteria:
          </Paragraph>

          <List
            header={<Text strong>Assignment Criteria:</Text>}
            bordered
            dataSource={[
              'Variety (Species) - Different varieties of Koi are evaluated based on their unique characteristics.',
              'Size - Koi are grouped into categories depending on their size to ensure fairness.',
              'Age - Age plays a key role, with younger and older Koi competing in different categories.'
            ]}
            renderItem={item => <List.Item>{item}</List.Item>}
          />

          <Divider />

          <Paragraph style={{ textAlign: 'center', marginTop: '20px', fontSize: '16px' }}>
            <Text italic>“The true beauty of a Koi fish is not just in its appearance, but in how it captivates the eye across all categories, regardless of age or size.”</Text>
          </Paragraph>
        </Typography>
      </Card>
    </div>
  );
};

export default ManageJudgingCriteria;
