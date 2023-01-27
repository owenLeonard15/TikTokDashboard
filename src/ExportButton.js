import { useQuery } from '@apollo/client';
import { GET_METRICS_FROM_LIST } from './operations';
import { ExportToCsv } from 'export-to-csv';
import './ExportButton.scss';

const current = new Date();
const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;

const csvOptions = { 
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true, 
    showTitle: true,
    title: ('TikTok Hashtag Views as of ' + date),
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  };

  const csvExporter = new ExportToCsv(csvOptions);


const ExportButton = ({ currentTags }) => {

    const { loading, error, data} = useQuery(
        GET_METRICS_FROM_LIST, {
            variables: { currentTags },
            pollInterval: 500,
        }
    );

    const exportCSV = () => {  
        csvExporter.generateCsv(data.metrics);
    }

    return loading 
        ? <p>loading</p> 
        : <button onClick={() => exportCSV()} className="rkmd-btn">
                Export to CSV
        </button>
}

export default ExportButton;