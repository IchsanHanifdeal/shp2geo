const shp2geojson = require('shp2geojson');
const fs = require('fs');
const path = require('path');

// Lokasi berkas SHP input dan folder output
const inputShpFolder = 'shp';
const outputGeojsonFolder = 'output';

// Pastikan folder output ada, jika tidak, buat folder tersebut
if (!fs.existsSync(outputGeojsonFolder)) {
    fs.mkdirSync(outputGeojsonFolder);
}

// Daftar berkas SHP dalam folder input_shp
const shpFiles = fs.readdirSync(inputShpFolder).filter(file => file.toLowerCase().endsWith('.shp'));

// Loop melalui setiap berkas SHP dan konversi ke GeoJSON
shpFiles.forEach(shpFile => {
    const shpFilePath = path.join(inputShpFolder, shpFile);
    const geojsonFileName = path.basename(shpFile, '.shp') + '.geojson';
    const geojsonFilePath = path.join(outputGeojsonFolder, geojsonFileName);

    shp2geojson.shp(shpFilePath, geojsonFilePath, (err) => {
        if (err) {
            console.error(`Gagal mengonversi ${shpFile}: ${err}`);
        } else {
            console.log(`Berhasil mengonversi ${shpFile} ke ${geojsonFileName}`);
        }
    });
});
