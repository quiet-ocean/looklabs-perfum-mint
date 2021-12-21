// import { Box, Heading, Grid } from 'theme-ui'
// import { Token } from '../components'
// import { useAppState } from '../state'
import {
  Heading, Grid, Box,
} from '@chakra-ui/react'

export type ProfileProps = {}

const About = () => {

  return (
    <div className="cyber-content margin-6">
      <div className="container">
        <Heading as="h1">My Profile</Heading>
        <Grid columns={['1fr', '1fr 1fr']} sx={{ overflow: 'hidden', gap: '0 20px' }}>
          <Box>
            <Heading as="h4" sx={{ color: 'green' }}>
              Address
            </Heading>
          </Box>
          <Box>
            <Heading as="h4" sx={{ color: 'green' }}>
              Balance
            </Heading>
          </Box>
        </Grid>
      </div>
    </div>
  )
}

export { About }
