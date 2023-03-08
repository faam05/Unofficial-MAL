import { Card, Flex, Group, SimpleGrid, Text } from '@mantine/core'
import { useState } from 'react'

export default function Characters({ data }) {
  return (
    <>
      <Text style={{ borderStyle: 'solid', borderWidth: '0 0 1px' }} p={3}>
        Characters
      </Text>
      {data ? (
        <>
          {data.map((item, index) => {
            return (
              <SimpleGrid cols={2} key={index} p={'5px 0'} bg={index % 2 == 0 ? '#f8f8f8' : 'white'}>
                <div>
                  <Flex>
                    <img height={200} width={120} src={item.character.images.jpg.image_url} alt={item.name} />
                    <div style={{ marginLeft: '10px' }}>
                      <Text fz={14}>{item.character.name}</Text>
                      <Text fz={14}>{item.role}</Text>
                      <Text fz={14}>{Number(item.favorites).toLocaleString()} Favorites</Text>
                    </div>
                  </Flex>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                  {item.voice_actors.map((item, index) => {
                    return (
                      <Flex key={index} ta='right' ml={'auto'} justify={'right'}>
                        <div style={{ padding: '0 4px' }}>
                          <Text fz={12}>{item.person.name}</Text>
                          <Text fz={12}>{item.language}</Text>
                        </div>
                        <img width={42} height={62} src={item.person.images.jpg.image_url} />
                      </Flex>
                    )
                  })}
                </div>
              </SimpleGrid>
            )
          })}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}
