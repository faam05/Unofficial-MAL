import { Card, Flex, Image, Spoiler, Tabs, Text, Title } from '@mantine/core'
import Characters from '../Characters'
import Information from '../Information'

export default function DetailDesktop({ data, characters, activeTab, setActiveTab }) {
  return (
    <>
      <Card shadow='sm' p='lg' radius='md' withBorder>
        <div className='h1 detail-title'>
          <Text fz={16}>{data.title}</Text>
        </div>
        <div className='detail content-wrapper'>
          <div className='detail content-left'>
            <Image src={data.images.jpg.image_url} alt={data.title} />
            <div style={{ marginTop: 10 }}>
              <Title order={5} fz={12} style={{ borderStyle: 'solid', borderColor: '#bebebe', borderWidth: '0 0 1px' }} p='3px 0'>
                Alternative Titles
              </Title>
              <Spoiler my={10} maxHeight={120} fz={12} showLabel='More titles' hideLabel='Less titles'>
                {data.titles.map((item, index) => {
                  return (
                    <div style={{ padding: '3px 0', fontSize: 11, lineHeight: '1.53m' }} key={index}>
                      <Flex>
                        <Text fw={700}>{item.type} : </Text>
                        <Text ml={5}>{item.title}</Text>
                      </Flex>
                    </div>
                  )
                })}
              </Spoiler>
            </div>
            <div>
              <Title order={5} fz={12} style={{ borderStyle: 'solid', borderColor: '#bebebe', borderWidth: '0 0 1px' }} p='3px 0'>
                Information
              </Title>
              <div style={{ padding: '3px 0', fontSize: 11, lineHeight: '1.53m' }}>
                <Flex>
                  <Text fw={600}>Type:</Text>
                  <Text ml={5}>{data.type}</Text>
                </Flex>
                <Flex>
                  <Text fw={600}>Episodes:</Text>
                  <Text ml={5}>{data.episodes}</Text>
                </Flex>
                <Flex>
                  <Text fw={600}>Status:</Text>
                  <Text ml={5}>{data.status}</Text>
                </Flex>
                <Flex>
                  <Text fw={600}>Aired:</Text>
                  <Text ml={5}>{data.aired.string}</Text>
                </Flex>
                <Flex>
                  <Text fw={600}>Producers:</Text>
                  {data.producers.map((item, index) => {
                    return (
                      <>
                        <Text ml={5}>{item.name}</Text>
                        {index !== data.producers.length - 1 ? ',' : ''}
                      </>
                    )
                  })}
                </Flex>
                <Flex>
                  <Text fw={600}>Licensors:</Text>
                  {data.licensors.map((item, index) => {
                    return (
                      <>
                        <Text ml={5} key={index}>
                          {item.name}
                        </Text>
                        {index !== data.licensors.length - 1 ? ',' : ''}
                      </>
                    )
                  })}
                </Flex>
                <Flex>
                  <Text fw={600}>Studios:</Text>
                  {data.studios.map((item, index) => {
                    return (
                      <>
                        <Text ml={5} key={index}>
                          {item.name}
                        </Text>
                        {index !== data.studios.length - 1 ? ',' : ''}
                      </>
                    )
                  })}
                </Flex>
                <Flex>
                  <Text fw={600}>Source:</Text>
                  <Text ml={5}>{data.source}</Text>
                </Flex>
                <Flex>
                  <Text fw={600}>Genres:</Text>
                  {data.genres.map((item, index) => {
                    return (
                      <>
                        <Text ml={5} key={index}>
                          {item.name}
                        </Text>
                        {index !== data.genres.length - 1 ? ',' : ''}
                      </>
                    )
                  })}
                </Flex>
                <Flex>
                  <Text fw={600}>Themes:</Text>
                  {data.themes.map((item, index) => {
                    return (
                      <>
                        <Text ml={5} key={index}>
                          {item.name}
                        </Text>
                        {index !== data.themes.length - 1 ? ',' : ''}
                      </>
                    )
                  })}
                </Flex>
                <Flex>
                  {data.demographics.length === 0 ? null : (
                    <>
                      <Text fw={600}>Demographics:</Text>
                      {data.demographics.map((item, index) => {
                        return (
                          <>
                            <Text ml={5} key={index}>
                              {item.name}
                            </Text>
                            {index !== data.demographics.length - 1 ? ',' : ''}
                          </>
                        )
                      })}
                    </>
                  )}
                </Flex>
                <Flex>
                  <Text fw={600}>Duration:</Text>
                  <Text ml={5}>{data.duration}</Text>
                </Flex>
                <Flex>
                  <Text fw={600}>Rating:</Text>
                  <Text ml={5}>{data.rating}</Text>
                </Flex>
              </div>
            </div>
            <div>
              <Title order={5} fz={12} style={{ borderStyle: 'solid', borderColor: '#bebebe', borderWidth: '0 0 1px' }} p='3px 0'>
                Statistics
              </Title>
              <div style={{ padding: '3px 0', fontSize: 11, lineHeight: '1.53m' }}>
                <Flex>
                  <Text fw={600}>Score : </Text>
                  <Text ml={5}>
                    {data.score} (scored by {Number(data.scored_by).toLocaleString()} users)
                  </Text>
                </Flex>
                <Flex>
                  <Text fw={600}>Ranked : </Text>
                  <Text ml={5}>#{data.rank}</Text>
                </Flex>
                <Flex>
                  <Text fw={600}>Popularity : </Text>
                  <Text ml={5}>#{data.popularity}</Text>
                </Flex>
                <Flex>
                  <Text fw={600}>Members : </Text>
                  <Text ml={5}>{Number(data.members).toLocaleString()}</Text>
                </Flex>
                <Flex>
                  <Text fw={600}>Favorites : </Text>
                  <Text ml={5}>{Number(data.favorites).toLocaleString()}</Text>
                </Flex>
              </div>
            </div>
          </div>
          <div className='detail content-right'>
            <Tabs value={activeTab} onTabChange={setActiveTab}>
              <Tabs.List>
                <Tabs.Tab value='details'>Detail</Tabs.Tab>
                <Tabs.Tab value='characters'>Characters</Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value='details'>
                <Information data={data} />
              </Tabs.Panel>
              <Tabs.Panel value='characters'>
                <Characters data={characters} />
              </Tabs.Panel>
            </Tabs>
          </div>
        </div>
      </Card>
    </>
  )
}
