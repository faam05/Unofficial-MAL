import { Badge, Card, Flex, SimpleGrid, Text, Title } from '@mantine/core'
import React from 'react'

export default function Information({ data }) {
  return (
    <>
      <Card bg={'#f8f8f8'}>
        <Flex>
          <div style={{ display: 'block', textAlign: 'center' }}>
            <Badge>Score</Badge>
            <Title order={3} fw={700}>
              {data.score}
            </Title>
            <Text fz={10}>{Number(data.scored_by).toLocaleString()} users</Text>
          </div>
          <div style={{ display: 'inline-block', marginLeft: 10, paddingLeft: 10, borderWidth: '0 0px 0 1px', borderStyle: 'solid' }}>
            <Flex>
              <SimpleGrid cols={3}>
                <div style={{ textAlign: 'center' }}>
                  <Badge>Ranked</Badge>
                  <Text fw={700}>#{data.rank}</Text>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Badge>Popularity</Badge>
                  <Text fw={700}>#{data.popularity}</Text>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Badge>Members</Badge>
                  <Text fw={700}>{Number(data.members).toLocaleString()}</Text>
                </div>
              </SimpleGrid>
            </Flex>
            <Text style={{ float: 'left!important', padding: '0px 15px' }} fz={11} mt={5}>
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
