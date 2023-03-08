import { Anchor, Badge, Group, List, Spoiler, Text } from '@mantine/core'
import React from 'react'
import InformationModal from '../InformationModal'

export default function DetailMobile({ data, opened, setOpened }) {
  return (
    <>
      <div className='top'>
        <div className='h1 detail-title'>
          <Text fz={16}>{data.title}</Text>
        </div>
        <div className='content-wrapper'>
          <div className='content-left' style={{ backgroundImage: `url('${data.images.jpg.image_url}')` }}></div>
          <div className='content-right'>
            <List>
              <List.Item>
                <Badge size='xs' style={{ marginRight: 10 }}>
                  {Number(data.score)}
                </Badge>
                <span style={{ fontSize: '0.7rem', color: '#7a7a7a' }}>({Number(data.scored_by).toLocaleString()} users)</span>
              </List.Item>
              <List.Item>
                <Text fz={12}>Ranked #{data.rank}</Text>
              </List.Item>
              <List.Item>
                <Text fz={12}>{data.type}</Text>
              </List.Item>
              <List.Item style={{ lineHeight: '1rem' }}>
                <Text fw={500} style={{ fontSize: '0.7rem', marginRight: 10 }}>
                  Aired
                </Text>
                <Text fz={11} style={{ margin: 0 }}>
                  {data.aired.string}
                </Text>
              </List.Item>
              <List.Item style={{ lineHeight: '1rem' }}>
                <Text fw={500} style={{ fontSize: '0.7rem', marginRight: 10 }}>
                  Studios
                </Text>
                <Text fz={12} style={{ margin: 0 }}>
                  {data.studios.map((studio) => studio.name)}
                </Text>
              </List.Item>
              <List.Item style={{ marginTop: 10 }}>
                <InformationModal opened={opened} close={() => setOpened(false)} data={data} />
                <Group position='center'>
                  <Anchor onClick={() => setOpened(true)}>
                    <Text fz={12}>More Information</Text>
                  </Anchor>
                </Group>
              </List.Item>
            </List>
          </div>
        </div>
      </div>
      <div className='content-main' style={{ fontSize: '100%' }}>
        <h2 style={{ fontSize: '14px' }}>Synopsis</h2>
        <Spoiler maxHeight={120} showLabel='Show more' hideLabel='Hide' mt={5} fz='xs'>
          {data.synopsis}
        </Spoiler>
      </div>
    </>
  )
}
