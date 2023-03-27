import { AppDispatch, NextThunkDispatch } from '@/store/store';
import { useDispatch } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>() as NextThunkDispatch;
