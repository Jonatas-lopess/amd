import { useState } from 'react';
import Layout from '../../layout';
import Step from '../Step';
import saveData from '../../api/saveData';
import { getStorage } from '../CustomStorage';
import { Alert, Snackbar } from '@mui/material';

const Vistoria = ({ body, head }) => {
    const vistoria = body.data.read();
    const data = vistoria.vistoriaEtapas;
    const [currentStep, setCurrentStep] = useState(0);
    const [snackStatus, setSnackStatus] = useState({
        open: false,
        type: 'error',
        message: ""
    });

    const mountStepsArray = () => {
        let arr = []
        for (let index = 0; index < data.length; index++) {
            let element = data[index].imagens;
            for (let i = 0; i < element.length; i++) {
                arr.push(element[i]);
            }          
        }
        return arr;
    }
    const stepsArray = mountStepsArray();

    const mountArrayData = (fileArray) => {
        vistoria.vistoriaEtapas.map((element) => {
            element.imagens.map((e) => {
                e.cache = fileArray[Number(e.id)]

                return e;
            })

            return element;
        });

        return vistoria;
    };

    const sendFiles = () => {
        let fileArray = [];
        stepsArray.forEach((_, i) => {
            let file = getStorage(`file_${i}`);
            if (file === null) return;

            fileArray.push(file);
        });

        try {
            if((fileArray.length + 1) !== stepsArray.length) throw Error("Preencha todas as etapas.");
            
            head.functionPage = "vistoriaSave";
            let arrayData = Object.assign({}, head, mountArrayData(fileArray));
            let response = saveData(arrayData).then(res => res.json());

            console.log(response);

            localStorage.clear();
            sessionStorage.clear();
            setSnackStatus({open: true, type: 'success', message: "Vistoria enviada com sucesso!"})
        } catch (error) {
            setSnackStatus({open: true, type: 'error', message: error.message});
        }
    }

    return (
        <Layout info={vistoria} >
            <Step data={stepsArray[currentStep]} total={stepsArray.length} changeStep={setCurrentStep} submit={sendFiles} key={currentStep} />
            <Snackbar
                open={snackStatus.open}
                autoHideDuration={5000}
                anchorOrigin={{horizontal:'center', vertical:'bottom'}}
                onClose={
                    () => setSnackStatus(prev => ({...prev, open: false}))
                }
            >
                <Alert variant='filled' severity={snackStatus.type} sx={{ width: '100%' }}>
                    {snackStatus.message}
                </Alert>
            </Snackbar>
        </Layout>
    )
}

export default Vistoria;