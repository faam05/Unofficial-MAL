import { Badge, Flex, Modal, SimpleGrid, Table, Text } from '@mantine/core'
import React from 'react'

export default function InformationModal({ opened, close, data }) {
  return (
    <Modal overflow='inside' opened={opened} onClose={close} title='Information'>
      <Table p={0} m={0}>
        <tbody>
          <tr>
            <td className='ar modal-title'>
              Alternative
              <br />
              Titles
            </td>
            <td style={{ verticalAlign: 'top', lineHeight: '1rem' }}>
              {data.titles.map((title, index) => {
                return (
                  <div key={index}>
                    <Text fz={11}>{title.type}</Text>
                    <Text fz={14} fw={700}>
                      {title.title}
                    </Text>
                  </div>
                )
              })}
            </td>
          </tr>
          <tr>
            <td className='ar modal-title'>Type</td>
            <td className='modal-main'>{data.type}</td>
          </tr>
          <tr>
            <td className='ar modal-title'>Source</td>
            <td className='modal-main' style={{ fontWeight: 700 }}>
              {data.source}
            </td>
          </tr>
          <tr>
            <td className='ar modal-title'>Episodes</td>
            <td className='modal-main'>{data.episodes}</td>
          </tr>
          <tr>
            <td className='ar modal-title'>Status</td>
            <td className='modal-main'>{data.status}</td>
          </tr>
          <tr>
            <td className='ar modal-title'>Aired</td>
            <td className='modal-main'>{data.aired.string}</td>
          </tr>
          <tr>
            <td className='ar modal-title'>Producers</td>
            <td className='modal-main'>
              <Flex>
                {data.producers.map((item, index) => {
                  return (
                    <Badge key={index} mr={1}>
                      {item.name}
                    </Badge>
                  )
                })}
              </Flex>
            </td>
          </tr>
          <tr>
            <td className='ar modal-title'>Licensors</td>
            <td className='modal-main'>
              <Flex>
                {data.licensors.map((item, index) => {
                  return (
                    <Badge key={index} mr={1}>
                      {item.name}
                    </Badge>
                  )
                })}
              </Flex>
            </td>
          </tr>
          <tr>
            <td className='ar modal-title'>Studio</td>
            <td className='modal-main'>
              <Flex>
                {data.studios.map((item, index) => {
                  return (
                    <Badge key={index} mr={1}>
                      {item.name}
                    </Badge>
                  )
                })}
              </Flex>
            </td>
          </tr>

          <tr>
            <td className='ar modal-title'>Genres</td>
            <td className='modal-main'>
              {data.genres.map((item, index) => {
                return (
                  <Badge key={index} mr={1}>
                    {item.name}
                  </Badge>
                )
              })}
            </td>
          </tr>
          <tr>
            <td className='ar modal-title'>Theme</td>
            <td className='modal-main'>
              <Flex>
                {data.themes.map((item, index) => {
                  return (
                    <Badge key={index} mr={1}>
                      {item.name}
                    </Badge>
                  )
                })}
              </Flex>
            </td>
          </tr>
          <tr>
            <td className='ar modal-title'>Demographic</td>
            <td className='modal-main'>
              <Flex>
                {data.demographics.map((item, index) => {
                  return (
                    <Badge key={index} mr={1}>
                      {item.name}
                    </Badge>
                  )
                })}
              </Flex>
            </td>
          </tr>
          <tr>
            <td className='ar modal-title'>Duration</td>
            <td className='modal-main'>{data.duration}</td>
          </tr>
          <tr>
            <td className='ar modal-title'>Rating</td>
            <td className='modal-main'>{data.rating}</td>
          </tr>
        </tbody>
      </Table>
    </Modal>
  )
}
