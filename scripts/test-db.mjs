
// const { PrismaClient } = require("@prisma/client"); 
// const { PrismaMariaDb } = require("@prisma/adapter-mariadb");

import pkg from '@prisma/client';
const { PrismaClient } = pkg;

import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
  host:     process.env.MYSQL_HOST || 'localhost',
  port:     process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT) : 3306,
  user:     'root',
  password: 'mu66:o::',
  database: 'modern_react',
});

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
  errorFormat: 'pretty',
  adapter: adapter
})

console.log('created 1: ');
const comment = await prisma.comment.create({
  data: {
    slug: 'hellblade',
    message: 'mesasge from javascript',
    user: 'Alice',
    postedAt: new Date(),
  }
});
console.log('created: ', comment);