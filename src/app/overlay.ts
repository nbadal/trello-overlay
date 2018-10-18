import {QueryDocumentSnapshot} from '@angular/fire/firestore';

export interface Overlay {
  id?: string;
  user: string;
  title: string;
  boards: string[];
}

export function overlayFrom(doc: QueryDocumentSnapshot<Overlay>) {
  const data = doc.data();
  data.id = doc.id;
  return data;
}
