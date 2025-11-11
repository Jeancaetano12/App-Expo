import React from 'react';
import { BaseToastProps } from 'react-native-toast-message';
import { CustomToastLayout } from '../components/ToastLayout';

export const toastConfig = {
    success: (props: BaseToastProps) => (
        <CustomToastLayout
            {...props}
            borderColorClass="border-green-500"
            shadowColorClass="shadow-green-500/50"
        />
    ),

    error: (props: BaseToastProps) => (
        <CustomToastLayout
            {...props}
            borderColorClass="border-red-500"
            shadowColorClass="shadow-red-500/50"
        />
    ),

    info: (props: BaseToastProps) => (
        <CustomToastLayout
            {...props}
            borderColorClass="border-yellow-500"
            shadowColorClass="shadow-yellow-500/50"
        />
    ),
};