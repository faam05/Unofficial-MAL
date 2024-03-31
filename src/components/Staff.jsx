import { Flex, Image, Text } from '@mantine/core'
import { Carousel } from '@mantine/carousel'
import { NavLink, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '../utils'
import { useMobileDevice } from '../hooks/useMobileDevice'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import MyCarousel from './Carousel'
import StaffLoading from './loading/Staff'
import CarouselLoading from './loading/CarouselLoading'

const Staff = ({ loading }) => {
  const { id } = useParams()
  const mobile = useMobileDevice()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['staff', id],
    queryFn: () => fetcher(`https://api.jikan.moe/v4/anime/${id}/staff`),
    // retry: 10,
  })

  if (isError) {
    return (
      <div style={{ textAlign: 'center' }}>
        <Text>Something went wrong when fetching List Staff</Text>
      </div>
    )
  }

  if (loading || isLoading) {
    if (mobile) {
      return (
        <CarouselLoading carouselStyle={{ display: 'flex', flexDirection: 'column', maxWidth: '90px', marginRight: 1 }}>
          <Skeleton width={90} height={126} />
          <Skeleton width={30} />
          <Skeleton width={80} />
        </CarouselLoading>
      )
    } else {
      Array(10)
        .fill()
        .map((_, index) => <StaffLoading key={index} bg={index % 2 == 0 ? 'white' : '#f8f8f8'} />)
    }
  }

  if (mobile) {
    return (
      <MyCarousel drag={true} slideGap='xs' withControls={false} slideSize='fit-contain' loop={false} changeSlide='auto'>
        {data?.map((item, index) => {
          return (
            <Carousel.Slide
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '90px',
                marginRight: 1,
              }}>
              <NavLink to={item.person.url}>
                <Image height={126} width={90} src={item.person.images.jpg.image_url} />
              </NavLink>
              <Text fz={10} truncate>
                {item.positions ? item.positions.join(', ') : ''}
              </Text>
              <NavLink to={item.person.url} style={{ textDecoration: 'none' }}>
                <Text fz={10} truncate>
                  {item.person.name}
                </Text>
              </NavLink>
            </Carousel.Slide>
          )
        })}
      </MyCarousel>
    )
  }

  return data.map((item, index) => {
    return (
      <div key={index} style={{ backgroundColor: index % 2 == 0 ? 'white' : '#f8f8f8' }}>
        <Flex p='5px 0' maw='max-content'>
          <NavLink to={item.person.url} style={{ textDecoration: 'none' }}>
            <Image width={42} height={62} src={item.person.images.jpg.image_url} />
          </NavLink>
          <div style={{ padding: '0 4px' }}>
            <NavLink to={item.person.url} style={{ textDecoration: 'none' }}>
              <Text fz={12}>{item.person.name}</Text>
            </NavLink>
            <div style={{ padding: '3px 0' }}>
              {item.positions.map((items, index) => (
                <small key={index} style={{ fontSize: 'x-small' }}>
                  {items}
                  {item.positions.length != index + 1 ? ', ' : ''}
                </small>
              ))}
            </div>
          </div>
        </Flex>
      </div>
    )
  })

  // return (
  //   <>
  //     {isLoading ? (
  //       mobile ? (
  //         <CarouselLoading carouselStyle={{ display: 'flex', flexDirection: 'column', maxWidth: '90px', marginRight: 1 }}>
  //           <Skeleton width={90} height={126} />
  //           <Skeleton width={30} />
  //           <Skeleton width={80} />
  //         </CarouselLoading>
  //       ) : (
  //         Array(10)
  //           .fill()
  //           .map((_, index) => <StaffLoading key={index} bg={index % 2 == 0 ? 'white' : '#f8f8f8'} />)
  //       )
  //     ) : mobile ? (
  //       <MyCarousel drag={true} slideGap='1px' withControls={false} slideSize='fit-contain' changeSlide='auto'>
  //         {data?.map((item, index) => {
  //           return (
  //             <Carousel.Slide
  //               key={index}
  //               style={{
  //                 display: 'flex',
  //                 flexDirection: 'column',
  //                 maxWidth: '90px',
  //                 marginRight: 1,
  //               }}>
  //               <NavLink to={item.person.url}>
  //                 <Image  height={126} width={90} src={item.person.images.jpg.image_url}  />
  //               </NavLink>
  //               <Text fz={10} truncate>
  //                 {item.positions ? item.positions.join(', ') : ''}
  //               </Text>
  //               <NavLink to={item.person.url} style={{ textDecoration: 'none' }}>
  //                 <Text fz={10} truncate>
  //                   {item.person.name}
  //                 </Text>
  //               </NavLink>
  //             </Carousel.Slide>
  //           )
  //         })}
  //       </MyCarousel>
  //     ) : (
  //       data.map((item, index) => {
  //         return (
  //           <div key={index} style={{ backgroundColor: index % 2 == 0 ? 'white' : '#f8f8f8' }}>
  //             <Flex p='5px 0' maw='max-content'>
  //               <NavLink to={item.person.url} style={{ textDecoration: 'none' }}>
  //                 <Image  width={42} height={62} src={item.person.images.jpg.image_url} />
  //               </NavLink>
  //               <div style={{ padding: '0 4px' }}>
  //                 <NavLink to={item.person.url} style={{ textDecoration: 'none' }}>
  //                   <Text fz={12}>{item.person.name}</Text>
  //                 </NavLink>
  //                 <div style={{ padding: '3px 0' }}>
  //                   {item.positions.map((items, index) => (
  //                     <small key={index} style={{ fontSize: 'x-small' }}>
  //                       {items}
  //                       {item.positions.length != index + 1 ? ', ' : ''}
  //                     </small>
  //                   ))}
  //                 </div>
  //               </div>
  //             </Flex>
  //           </div>
  //         )
  //       })
  //     )}
  //   </>
  // )
}

export default Staff
