export interface CropData {
    year: number;
    crop: string;
    production: number;
    area: number;
  }
  
  export interface MaxMinProduction {
    year: number;
    maxCrop: { crop: string; production: number };
    minCrop: { crop: string; production: number };
  }
  
  export interface AvgData {
    crop: string;
    avgProduction: number;
    avgArea: number;
  }
  
  export const processData = (data: any[]) => {
    const parsedData: CropData[] = data.map((item) => ({
      year: parseInt(item.Year.match(/\d{4}/)[0]),
      crop: item['Crop Name'],
      production: item['Crop Production (UOM:t(Tonnes))'] === "" ? 0 : parseFloat(item['Crop Production (UOM:t(Tonnes))']),
      area: item['Area Under Cultivation (UOM:Ha(Hectares))'] === "" ? 0 : parseFloat(item['Area Under Cultivation (UOM:Ha(Hectares))']),
    }));
  
    const maxMinProduction: MaxMinProduction[] = [];
    const cropStats: Record<string, { totalProduction: number; totalArea: number; count: number }> = {};
  
    parsedData.forEach(({ year, crop, production, area }) => {
      if (!cropStats[crop]) {
        cropStats[crop] = { totalProduction: 0, totalArea: 0, count: 0 };
      }
      cropStats[crop].totalProduction += production;
      cropStats[crop].totalArea += area;
      cropStats[crop].count += 1;
  
      const yearData = maxMinProduction.find((item) => item.year === year);
      if (yearData) {
        if (production > yearData.maxCrop.production) {
          yearData.maxCrop = { crop, production };
        }
        if (production < yearData.minCrop.production || yearData.minCrop.production === 0) {
          yearData.minCrop = { crop, production };
        }
      } else {
        maxMinProduction.push({
          year,
          maxCrop: { crop, production },
          minCrop: { crop, production },
        });
      }
    });
  
    const avgData: AvgData[] = Object.entries(cropStats).map(([crop, stats]) => ({
      crop,
      avgProduction: parseFloat((stats.totalProduction / stats.count).toFixed(3)),
      avgArea: parseFloat((stats.totalArea / stats.count).toFixed(3)),
    }));
  
    return { maxMinProduction, avgData };
  };