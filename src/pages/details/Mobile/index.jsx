import { Anchor, Badge, Group, List, Spoiler, Text, Accordion, Flex, Image } from '@mantine/core'
import React from 'react'
import InformationModal from '../InformationModal'
import { Carousel } from '@mantine/carousel'

export default function DetailMobile({ data, opened, setOpened, accordionValue, setAccordionValue, dataAccordion }) {
  return (
    <>
      <div className='top'>
        <div className='h1 detail-title'>
          <Text fz={16}>{data.title}</Text>
        </div>
        <div className='content-wrapper'>
          <div className='content-left' style={{ backgroundImage: `url('${data.images.jpg.large_image_url}')` }}></div>
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
                  {data.studios.map((studio, index) => (
                    <Text key={index}>{studio.name}</Text>
                  ))}
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
      <div className='content-main' style={{ fontSize: '100%', padding: '0 10px 10px 10px' }}>
        <h2 style={{ fontSize: '14px' }}>Synopsis</h2>
        <Spoiler maxHeight={120} showLabel='Show more' hideLabel='Hide' mt={5} fz='xs'>
          {data.synopsis}
        </Spoiler>
      </div>
      <div style={{ margin: '10px 0' }}>
        <Accordion defaultValue={accordionValue} chevronPosition='left'>
          <Accordion.Item value='characters'>
            <Accordion.Control>Characters</Accordion.Control>
            <Accordion.Panel>
              <Carousel
                align='start'
                dragFree
                withControls={false}
                slideSize='160'
                style={{
                  position: 'relative',
                }}>
                {dataAccordion?.map((item, index) => {
                  if (item.voice_actors[0]) {
                    return (
                      <Carousel.Slide key={index}>
                        <Flex>
                          <Image h={108.88} withPlaceholder width={70} src={item.character.images.jpg.image_url} alt={item.name} />
                          <Text
                            color='white'
                            fz={8}
                            style={{
                              position: 'absolute',
                              top: 0,
                              right: 0,
                              fontWeight: 400,
                              padding: '0px 5px',
                              background: `linear-gradient(0deg, rgba(0,0,0,1) 30%, rgba(255,255,255,0) 100%)`,
                            }}>
                            {Number(item.favorites).toLocaleString()} users
                          </Text>
                          <Text
                            fz={8}
                            truncate
                            color='white'
                            style={{
                              width: '100%',
                              top: 78,
                              fontWeight: 400,
                              padding: '15px 5px 5px',
                              position: 'absolute',
                              background: `linear-gradient(0deg, rgba(0,0,0,1) 30%, rgba(255,255,255,0) 100%)`,
                            }}>
                            {item.character.name}
                          </Text>
                        </Flex>
                        <Flex>
                          <Image withPlaceholder width={70} src={item.voice_actors[0]?.person.images.jpg.image_url} alt={item.name} />
                          <Text
                            truncate
                            fz={8}
                            color='white'
                            style={{
                              width: '100%',
                              fontWeight: 400,
                              padding: '15px 5px 5px',
                              bottom: 0,
                              position: 'absolute',
                              background: `linear-gradient(0deg, rgba(0,0,0,1) 30%, rgba(255,255,255,0) 100%)`,
                            }}>
                            {item.voice_actors[0]?.person.name}
                          </Text>
                        </Flex>
                      </Carousel.Slide>
                    )
                  }
                })}
              </Carousel>
              <Carousel
                align='start'
                dragFree
                withControls={false}
                height='auto'
                slideSize='162'
                style={{
                  position: 'relative',
                }}>
                {dataAccordion?.map((item, index) => (
                  <Carousel.Slide key={index}></Carousel.Slide>
                ))}
              </Carousel>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value='reviews'>
            <Accordion.Control>Reviews</Accordion.Control>
            <Accordion.Panel>
              Configure components appearance and behavior with vast amount of settings or overwrite any part of component styles
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value='recomendations'>
            <Accordion.Control>Recomendations</Accordion.Control>
            <Accordion.Panel>With new :focus-visible pseudo-class focus ring appears only when user navigates with keyboard</Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  )
}
