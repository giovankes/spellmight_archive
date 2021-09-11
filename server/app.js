import http from 'node:http';
import express from 'express'
import cors from 'cors'

import { socker } from './socker/index.js'
import {config} from './config.js'

const app = express ();
const server = new http.Server(app)
socker(server);

