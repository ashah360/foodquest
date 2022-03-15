import type { NextPage } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Navbar from '../components/Navbar';
import styled, { ThemeProvider } from 'styled-components';
import axios from 'axios';
import { theme } from '../resources/theme';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>FoodQuest</title>
      </Head>
    </div>
  );
};

export default Home;
