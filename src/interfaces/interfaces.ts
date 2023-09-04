export interface Data {
    date: string;
    views: number;
    hashtag: string;
  }
  
export interface LineChartProps {
    data: Data[];
    width: number;
    height: number;
    color: string;
  }
  
export interface MultiLineChartProps {
    data: Data[];
    width: number;
    height: number;
  }
  