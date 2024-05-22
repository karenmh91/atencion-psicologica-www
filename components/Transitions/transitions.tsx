import { Slide, SlideProps } from '@mui/material';

const SlideTransition = (props: SlideProps) => {
    return <Slide {...props} direction="left" />;
};

export { SlideTransition };
