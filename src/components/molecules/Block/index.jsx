import React  from 'react'
import {
  Accordion,
  Typography,
} from '@mui/material'
import Paper from '@mui/material/Paper'
import CardActionArea from "@mui/material/CardActionArea"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import Card from "@mui/material/Card"
import { styled } from "@mui/material/styles"
import { useNavigate } from "react-router"
import Stack from "@mui/material/Stack"
//src

// import { TODO
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   CardActionArea,
// } from '@mui/material'

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  color: theme.palette.text.secondary,
}));

export default function Block ({valueId, valueName}) {
  const navigate = useNavigate()
    return (
      <Stack
        direction="wrap"
        justifyContent="space-evenly"
        alignItems="center"
        spacing={2}
        m={2}
      >
        <Paper>
          <StyledAccordion >
            <Card sx={{ maxWidth: 345 , minWidth: 300}} onClick={() => navigate(`${valueId}/${valueName}`)}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={`https://starwars-visualguide.com/assets/img/planets/${valueId}.jpg`}
                  alt="фотокарточка"
                />
                <CardContent>
                  <Typography
                    variant="h5"
                    gutterBottom
                    color="blue"
                  >
                    {valueName}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    описание
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </StyledAccordion>
        </Paper>
      </Stack>
    );
  }


