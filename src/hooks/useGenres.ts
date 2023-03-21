import { AxiosError, CanceledError } from "axios";
import React, { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import useData from "./useData";

export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

const useGenres = () => useData<Genre>("/genres");

export default useGenres;
