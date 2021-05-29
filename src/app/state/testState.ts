import { ViewMode } from '@simpl/sishell-element';
import { ConnectionState } from '../shared/models/external-system';
import { AppState } from './app/app.reducer';
import { ExternalSystemState } from './externalSystem/external-system.store';
import { SystemTypesState } from './systemType/systemType.store';

export const initialState: {
  app: AppState;
  externalsystem: ExternalSystemState;
  systemtype: SystemTypesState;
} = {
  app: {
    viewMode: ViewMode.View
  },
  externalsystem: {
    pageCache: {},
    pagedIds: [],
    pageInfo: { pageNumber: 0, size: 20, totalElements: 20, totalPages: 1 },
    isLoading: true,
    inOperation: false,
    searchTerm: '',
    ids: [1, 2],
    entities: {
      1: {
        id: '1',
        name: 'system1',
        connectionState: ConnectionState.INITIAL
      },
      2: {
        id: '2',
        name: 'system2',
        connectionState: ConnectionState.INITIAL
      }
    },
    selectedExternalSystem: {
      id: '1',
      name: 'test',
      connectionState: ConnectionState.INITIAL,
      type: 'SiPass'
    }
  },
  systemtype: {
    ids: [1, 2],
    isLoading: false,
    entities: {
      'SiPass': {
        id: '1',
        name: 'SiPass',
        description: 'SiPass supports ExportIdentities'
      },
      'SIPORT': {
        id: '1',
        name: 'SIPORT',
        description: 'SIPORT supports ExportIdentities,ImportPrivileges'
      }
    }
  }
};
