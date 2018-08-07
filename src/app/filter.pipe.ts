import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {
  transform(videos: any[], searchText: string): any[] {
    if(!videos) return [];
    if(!searchText) return videos;
searchText = searchText.toLowerCase();
return videos.filter( it => {
  return it.title.toLowerCase().includes(searchText);
    });
   }
}