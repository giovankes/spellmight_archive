/* eslint-disable operator-linebreak */
import dotenv from 'dotenv'
import axios from 'axios'
import consola from 'consola'
dotenv.config()

function getDefault(value, defaultValue) {
  if (!value || value === 'undefined') {
    return defaultValue
  }

  return value
}
const productionHosts = ['https://giotje.dev']
const devHosts = ['http://localhost:3000']

export const config = {
  IS_DEVELOPMENT:
    getDefault(process.env.NODE_ENV, 'development') !== 'production',

  DB_URL: getDefault(
    process.env.DB_URL,
    'mongodb://localhost:27017/spellmight'
  ),
  API_PORT: process.env.API_PORT
    ? Number.parseInt(process.env.API_PORT, 10)
    : 8080,
  SOCKET_PORT: process.env.SOCKET_PORT
    ? Number.parseInt(process.env.SOCKET_PORT, 10)
    : 65080,
  SALT_ROUNDS: process.env.SALT_ROUNDS
    ? Number.parseInt(process.env.SALT_ROUNDS, 10)
    : 6,
  DEFAULT_MAX_TIMER: 120 * 1000,
  DEFAULT_MAX_PLAYERS: 14,

  ALLOWLIST_HOSTS:
    getDefault(process.env.NODE_ENV, 'development') === 'production'
      ? productionHosts
      : devHosts,

  ROOM_ID_RX: /^([A-Z\d]){6}$/,
}

export const getExternalIp = async () => {
  const options = {
    headers: {
      'Metadata-Flavor': 'Google',
    },
  }

  try {
    const response = await axios.get(
      config.METADATA_NETWORK_INTERFACE_URL,
      options
    )
    if (response.status !== 200) {
      consola.warn('Error while talking to metadata server, assuming localhost')
      return 'localhost'
    }

    return response.data.body
  } catch (error) {
    consola.warn(
      error,
      'Error while talking to metadata server, assuming localhost'
    )
    return 'localhost'
  }
}
