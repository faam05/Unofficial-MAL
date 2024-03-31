// import { AppShell, Container, createStyles } from '@mantine/core'
// import CustomHeader2 from '../headers/header2'
// import Footers from '../footers'
// import { useMobileDevice } from '../../hooks/useMobileDevice'
// const useStyles = createStyles((theme) => ({
//   header: {
//     paddingLeft: theme.spacing.md,
//     paddingRight: theme.spacing.md,
//     [theme.breakpoints.md]: {
//       paddingLeft: theme.spacing.xl,
//       paddingRight: theme.spacing.xl,
//     },
//   },

//   inner: {
//     height: 56,
//     display: 'flex',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//   },

//   links: {
//     [theme.fn.smallerThan('md')]: {
//       display: 'none',
//     },
//   },

//   search: {
//     [theme.fn.smallerThan('xs')]: {
//       display: 'none',
//     },
//   },

//   link: {
//     display: 'block',
//     lineHeight: 1,
//     padding: '8px 12px',
//     borderRadius: theme.radius.sm,
//     textDecoration: 'none',
//     color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
//     fontSize: theme.fontSizes.sm,
//     fontWeight: 500,

//     '&:hover': {
//       backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
//     },
//   },
// }))

// export default function Layout({ children }) {
//   const matches = useMobileDevice()

//   return (
//     <>p</>
//     // <AppShell style={{ minHeight: '100vh', width: '100%', overflowX: 'hidden' }} footer={<Footers />} header={<CustomHeader2 />}>
//     //   {matches ? <>{children}</> : <Container size={1060}>{children}</Container>}
//     // </AppShell>
//   )
// }
