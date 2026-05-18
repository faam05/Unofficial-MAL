import { Group, Pagination, Text } from '@mantine/core'
import Skeleton from 'react-loading-skeleton'
import { NavLink } from 'react-router'
import ImageWithSkeleton from '../ui/ImageWithSkeleton'

const ListPage = ({ data, isLoading, activePage, handleChangePage, title, maxPages, type }) => {
  return (
    <>
      <h1 className='border-b font-bold'>{isLoading ? <Skeleton /> : title}</h1>
      <section className='mt-2 grid grid-cols-3 gap-1 sm:grid-cols-3 md:grid-cols-5'>
        {isLoading
          ? Array(15)
              .fill()
              .map((_, index) => <Skeleton key={index} className='h-28 max-h-[220px] sm:h-36 md:h-[220px]' />)
          : data.map((item) => (
              <NavLink
                key={`${item.slug}_${item.current_episode}`}
                to={`/anime/${item.slug}?type=${type}`}
                className='relative overflow-hidden rounded-md text-xs text-white'>
                <ImageWithSkeleton
                  src={item.thumbnail}
                  alt={item.judul}
                  width={160}
                  height={220}
                  containersClassName={'delay-1000'}
                  className={'hover:scale-110'}
                />
                <p className='absolute top-0 bg-black bg-opacity-70 p-0.5 sm:text-sm'>{item.episode}</p>
                <p className='absolute top-1/2 bg-red-500 bg-opacity-70 p-0.5 sm:text-sm'>{item.tanggal}</p>
                <p className='absolute right-0 top-0 hidden bg-black bg-opacity-70 p-0.5 sm:block'>{item.hari}</p>
                <Text
                  lineClamp={1}
                  fz={12}
                  fw={400}
                  w='100%'
                  p='15px 5px 0px'
                  mb='5px'
                  bottom={0}
                  pos='absolute'
                  bg='linear-gradient(0deg, rgba(0,0,0,1) 30%, rgba(255,255,255,0) 100%)'
                  style={{
                    // whiteSpace: 'nowrap',
                    boxShadow: '0 5px 0 #000',
                  }}>
                  {item.judul}
                </Text>
              </NavLink>
            ))}
      </section>

      {!isLoading && (
        <>
          <Pagination.Root total={maxPages} mt='sm' color='red' value={activePage} onChange={handleChangePage}>
            <Group gap={5} justify='center'>
              <Pagination.First />
              <Pagination.Previous />
              <Pagination.Items />
              <Pagination.Next />
              <Pagination.Last />
            </Group>
          </Pagination.Root>
        </>
      )}
    </>
  )
}

export default ListPage
