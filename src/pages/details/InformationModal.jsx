import { Badge, Flex, Group, Modal, SimpleGrid, Table, Text } from '@mantine/core'
import React from 'react'

export default function InformationModal({ opened, close, data }) {
  return (
    <Modal size='calc(100vw - 50px)' overflow='inside' opened={opened} onClose={close} title='Information'>
      <table>
        <tbody>
          <tr>
            <td style={{ width: '10px', padding: 0 }} className='ar modal-title'>
              <Text fz={14}>
                Alternative
                <br />
                Titles
              </Text>
            </td>
            <td style={{ verticalAlign: 'top', lineHeight: '1rem' }}>
              {data.titles.map((title, index) => {
                return (
                  <div key={index}>
                    <Text fz={12}>{title.type}</Text>
                    <Text fz={14} fw={700}>
                      {title.title}
                    </Text>
                  </div>
                )
              })}
            </td>
          </tr>
          <tr>
            <td className='ar modal-title' style={{}}>
              <Text fz={14}>Type</Text>
            </td>
            <td className='modal-main'>
              <Text fz={14} fw={700}>
                {data.type}
              </Text>
            </td>
          </tr>
          <tr>
            <td className='ar modal-title'>
              <Text fz={14}>Source</Text>
            </td>
            <td className='modal-main' style={{ fontWeight: 700 }}>
              <Text fz={14}>{data.source}</Text>
            </td>
          </tr>
          <tr>
            <td className='ar modal-title'>
              <Text fz={14}>Episodes</Text>
            </td>
            <td className='modal-main'>
              <Text fz={14}>{data.episodes}</Text>
            </td>
          </tr>
          <tr>
            <td className='ar modal-title'>
              <Text fz={14}>Status</Text>
            </td>
            <td className='modal-main'>
              <Text fz={14}>{data.status}</Text>
            </td>
          </tr>
          <tr>
            <td className='ar modal-title'>
              <Text fz={14}>Aired</Text>
            </td>
            <td className='modal-main'>
              <Text fz={14}>{data.aired.string}</Text>
            </td>
          </tr>
          <tr>
            <td className='ar modal-title'>
              <Text fz={14}>Producers</Text>
            </td>
            <td className='modal-main'>
              <Flex>
                <Group style={{ gap: 0 }}>
                  {data.producers.map((item, index) => {
                    return (
                      <>
                        <Text key={index} fz={14} mr={1}>
                          {item.name}
                          {index !== data.producers.length - 1 ? ', ' : ''}
                        </Text>
                      </>
                    )
                  })}
                </Group>
              </Flex>
            </td>
          </tr>
          <tr>
            <td className='ar modal-title'>
              <Text fz={14}>Licensors</Text>
            </td>
            <td className='modal-main'>
              <Flex>
                {data.licensors.length === 0 ? (
                  <Text fz={14}>None found</Text>
                ) : (
                  <>
                    {data.licensors.map((item, index) => {
                      return (
                        <Text key={index} fz={14} mr={1}>
                          {item.name}
                          {index !== data.licensors.length - 1 ? ', ' : ''}
                        </Text>
                      )
                    })}
                  </>
                )}
              </Flex>
            </td>
          </tr>
          <tr>
            <td className='ar modal-title'>
              <Text fz={14}>Studio</Text>
            </td>
            <td className='modal-main'>
              <Flex>
                {data.studios.map((item, index) => {
                  return (
                    <Text key={index} fz={14} mr={1}>
                      {item.name}
                      {index !== data.studios.length - 1 ? ', ' : ''}
                    </Text>
                  )
                })}
              </Flex>
            </td>
          </tr>
          <tr>
            <td className='ar modal-title'>
              <Text fz={14}>Genres</Text>
            </td>
            <td className='modal-main'>
              <Flex>
                {data.genres.map((item, index) => {
                  return (
                    <Text fz={14} mr={1} key={index}>
                      {item.name}
                      {index !== data.genres.length - 1 ? ', ' : ''}
                    </Text>
                  )
                })}
              </Flex>
            </td>
          </tr>
          <tr>
            <td className='ar modal-title'>
              <Text fz={14}>Theme</Text>
            </td>
            <td className='modal-main'>
              <Flex>
                {data.themes.map((item, index) => {
                  return (
                    <Text fz={14} mr={1} key={index}>
                      {item.name}
                      {index !== data.themes.length - 1 ? ', ' : ''}
                    </Text>
                  )
                })}
              </Flex>
            </td>
          </tr>
          <tr>
            <td className='ar modal-title'>
              <Text fz={14}>Demographic</Text>
            </td>
            <td className='modal-main'>
              <Flex>
                {data.demographics.map((item, index) => {
                  return (
                    <Text key={index} fz={14} mr={1}>
                      {item.name}
                      {index !== data.demographics.length - 1 ? ', ' : ''}
                    </Text>
                  )
                })}
              </Flex>
            </td>
          </tr>
          <tr>
            <td className='ar modal-title'>
              <Text fz={14}>Duration</Text>
            </td>
            <td className='modal-main'>
              <Text fz={14}>{data.duration}</Text>
            </td>
          </tr>
          <tr>
            <td className='ar modal-title'>
              <Text fz={14}>Rating</Text>
            </td>
            <td className='modal-main'>
              <Text fz={14}>{data.rating}</Text>
            </td>
          </tr>
        </tbody>
      </table>
    </Modal>
  )
}
