import Image from '@/components/image';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <div className='h-screen flex justify-center items-center relative'>
            <Image
                className='absolute inset-0 object-cover w-full h-full'
                src="/bg-asiagroup.png"
                alt="warehouse"
                width={"100%"}
                height={"100%"}
            />
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)', // lớp phủ mờ
                    zIndex: 1,
                }}
            />
            <div className="absolute z-10 w-full max-w-md px-6">
                <Outlet />
            </div>
        </div>
    );
}

export default AuthLayout;
