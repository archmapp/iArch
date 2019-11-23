// https://qiita.com/daikiojm/items/2b4cc4c6a0e3735aad48
// MatPaginatorIntlを継承したクラスを作成する

import { MatPaginatorIntl } from "@angular/material";
import { Injectable } from "@angular/core";

@Injectable()
export class MatPaginatorIntlJa extends MatPaginatorIntl {
  itemsPerPageLabel = "件数/ページ:";
  nextPageLabel = "次へ";
  previousPageLabel = "戻る";

  getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `${length} 件中 0`;
    }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;

    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;

    return ` ${startIndex + 1} - ${endIndex} ／全件数:${length}`;
  };
}
