import { configureStore } from '@reduxjs/toolkit'
import pokeData from '../redux/reducers/getInitialPokemonData'

export const store = configureStore ({
    reducer: {
        app: pokeData
    },
})


