import { AxiosResponse } from 'axios-miniprogram'
import { getAxios } from "../../utils/helpers/customAxios";
import { buildQueryParams } from '../../utils/helpers/buildQueryParams';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import relativeTime from 'dayjs/plugin/relativeTime';
import localeData from 'dayjs/plugin/localeData';

dayjs.extend(relativeTime);
dayjs.extend(localeData);
dayjs.locale('id');

Page({
  data: {
    current: 0,
    steps1: ['Step A', 'Step B', 'Step C', 'Step D'],
    activeStep1: 'Step B'
  },
  onUnload() {
  },
  onLoad() {
  },
  handleClick() {
  },
});