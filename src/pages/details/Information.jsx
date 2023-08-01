import { Badge, Card, Flex, SimpleGrid, Text, Title } from '@mantine/core'
import React from 'react'

export default function Information({ data }) {
  return (
    <>
      <Card bg={'#f8f8f8'}>
        <Flex>
          <div style={{ display: 'block', textAlign: 'center' }}>
            <Badge size='xs'>Score</Badge>
            <Title order={5} fw={800}>
              {data.score ? data.score : 'N/A'}
            </Title>
            <Text fz={10}>{data.scored_by ? Number(data.scored_by).toLocaleString() : '-'} users</Text>
          </div>
          <div style={{ display: 'inline-block', marginLeft: 10, paddingLeft: 10, borderWidth: '0 0px 0 1px', borderStyle: 'solid' }}>
            <Flex mt='auto'>
              <SimpleGrid cols={3}>
                <div style={{ textAlign: 'center' }}>
                  <Flex>
                    <Text c={'dimmed'} style={{ marginRight: 5 }}>
                      Ranked
                    </Text>
                    <Text fw={700}>{data.rank ? '#' + data.rank : 'N/A'}</Text>
                  </Flex>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Flex>
                    <Text c={'dimmed'} style={{ marginRight: 5 }}>
                      Popularity
                    </Text>
                    <Text fw={700}>{data.popularity ? '#' + data.popularity : 'N/A'}</Text>
                  </Flex>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Flex>
                    <Text c={'dimmed'} style={{ marginRight: 5 }}>
                      Members
                    </Text>
                    <Text fw={700}>{data.members ? Number(data.members).toLocaleString() : 'N/A'}</Text>
                  </Flex>
                </div>
              </SimpleGrid>
            </Flex>
            <Text style={{ marginTop: '5%' }} fz={10}>
              <span style={{ padding: '0px 5px 0 0', borderStyle: 'solid', borderWidth: '0 1px 0 0' }}>
                {data.season && data.season.charAt(0).toUpperCase() + data.season.slice(1)} {data.year}
              </span>
              <span style={{ padding: '0px 5px', borderStyle: 'solid', borderWidth: '0 1px 0 0' }}>{data.type}</span>
              {data.studios.map((item, index) => {
                return (
                  <span style={{ paddingLeft: 5 }} key={index}>
                    {item.name}
                  </span>
                )
              })}
            </Text>
          </div>
        </Flex>
      </Card>
      <div>
        <h2
          style={{
            fontSize: 14,
            borderColor: '#bebebe',
            borderStyle: 'solid',
            borderWidth: '0 0 1px',
            color: 'black',
            fontWeight: 700,
            padding: '3px 0',
          }}>
          Synopsis
        </h2>
        <p style={{ lineHeight: '1.5em', margin: 0, padding: 0, fontSize: 12 }}>{data.synopsis ? data.synopsis : 'No Synopsis given.'}</p>
      </div>
      <div>
        <h2
          style={{
            fontSize: 14,
            borderColor: '#bebebe',
            borderStyle: 'solid',
            borderWidth: '0 0 1px',
            color: 'black',
            fontWeight: 700,
            padding: '3px 0',
          }}>
          Background
        </h2>
        <p style={{ lineHeight: '1.5em', margin: 0, padding: 0, fontSize: 12 }}>{data.background ? data.background : 'No Background given.'}</p>
      </div>
    </>
  )
}
