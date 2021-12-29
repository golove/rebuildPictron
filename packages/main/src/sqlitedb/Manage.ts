import GetImg from './GetImg';
import type { IData } from './Sqdb';
class MangeData {
  Beauty: GetImg;
  Ustyle: GetImg;
  Carton: GetImg;
  Leisi: GetImg;
  Selfie: GetImg;
  Passion: GetImg;

  constructor() {
    this.Beauty = new GetImg(
      'https://k6.c5cbca7s.pw/pw/thread.php?fid=14',
      'Beauty',
    );
    this.Ustyle = new GetImg(
      'https://k6.c5cbca7s.pw/pw/thread.php?fid=114',
      'Ustyle',
    );
    this.Carton = new GetImg(
      'https://k6.c5cbca7s.pw/pw/thread.php?fid=106',
      'Carton',
    );
    this.Leisi = new GetImg(
      'https://k6.c5cbca7s.pw/pw/thread.php?fid=21',
      'Leisi',
    );
    this.Selfie = new GetImg(
      'https://k6.c5cbca7s.pw/pw/thread.php?fid=15',
      'Selfie',
    );
    this.Passion = new GetImg(
      'https://k6.c5cbca7s.pw/pw/thread.php?fid=16',
      'Passion',
    );
  }

  getAllCollect(): Array<IData> {
    return [
      ...this.Beauty.collectData,
      ...this.Ustyle.collectData,
      ...this.Carton.collectData,
      ...this.Leisi.collectData,
      ...this.Selfie.collectData,
      ...this.Passion.collectData,
    ];
  }

  getAllDownload(): Array<IData> {
    // const collect = this.Beauty
    return [
      ...this.Beauty.downloadData,
      ...this.Ustyle.downloadData,
      ...this.Carton.downloadData,
      ...this.Leisi.downloadData,
      ...this.Selfie.downloadData,
      ...this.Passion.downloadData,
    ];
  }

  // getAllDelete(): Array<IData> {
  //   return [
  //     ...this.Beauty.deletedData,
  //     ...this.Ustyle.deletedData,
  //     ...this.Carton.deletedData,
  //     ...this.Leisi.deletedData,
  //     ...this.Selfie.deletedData,
  //     ...this.Passion.deletedData,
  //   ];
  // }
}

export default MangeData;
