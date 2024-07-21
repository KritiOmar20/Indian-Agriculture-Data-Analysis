import React, { useEffect, useState } from 'react';
import { MantineProvider, Container, Title, Text } from '@mantine/core';
import MaxMinTable from './components/MaxMinTable';
import AvgTable from './components/AvgTable';
import { processData, MaxMinProduction, AvgData } from './utils/dataProcessing';

const App: React.FC = () => {
  const [maxMinData, setMaxMinData] = useState<MaxMinProduction[]>([]);
  const [avgData, setAvgData] = useState<AvgData[]>([]);

  useEffect(() => {
    fetch('/dataset.json')
      .then((response) => {
        console.log('Fetch response:', response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: any[]) => {
        console.log('Data fetched:', data);
        const { maxMinProduction, avgData } = processData(data);
        setMaxMinData(maxMinProduction);
        setAvgData(avgData);
      })
      .catch((error) => console.error('Error fetching the dataset:', error));
  }, []);

  return (
    <MantineProvider>
      <Container>
        <Title order={1} className='centered'>Agriculture Data Analysis</Title>
        <Text size="lg" variant="bold" className='centered'>Maximum and Minimum Production by Year</Text>
        <MaxMinTable data={maxMinData} />
        <Text size="lg" className='centered' >Average Yield and Cultivation Area by Crop</Text>
        <AvgTable data={avgData} />
      </Container>
    </MantineProvider>
  );
};

export default App;