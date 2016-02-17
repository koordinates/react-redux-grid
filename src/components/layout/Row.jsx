import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { keyGenerator, keyFromObject } from '../../util/keygenerator';
import Cell from './Cell.jsx';
import { prefix } from '../../util/prefix';
import { stateGetter } from '../../util/stateGetter';
import { getCurrentRecords } from '../../util/getCurrentRecords';
import { CLASS_NAMES } from '../../constants/GridConstants';

class Row extends Component {

    static propTypes = {
        columnManager: PropTypes.object.isRequired,
        columns: PropTypes.arrayOf(PropTypes.Object).isRequired,
        data: PropTypes.arrayOf(PropTypes.Object),
        dataSource: PropTypes.object,
        editorState: PropTypes.object,
        emptyDataMessage: PropTypes.string,
        events: PropTypes.object,
        pageSize: PropTypes.number,
        pager: PropTypes.object,
        plugins: PropTypes.object,
        selectedRows: PropTypes.object,
        selectionModel: PropTypes.object,
        store: PropTypes.object.isRequired
    };

    static defaultProps = {
        emptyDataMessage: 'No Data Available'
    };

    getPlaceHolder() {

        const { emptyDataMessage } = this.props;

        const rowProps = {
            className: prefix(CLASS_NAMES.ROW)
        };

        const tdProps = {
            className: prefix(CLASS_NAMES.ROW, CLASS_NAMES.EMPTY_ROW)
        };

        return (
            <tr { ...rowProps }>
                <td colSpan="100%" { ...tdProps }>
                    { emptyDataMessage }
                </td>
            </tr>
        );

    }

    addEmptyInsert(cells, visibleColumns) {

        const { GRID_ACTIONS } = this.props.plugins;

        if (visibleColumns.length === 0) {

            if (GRID_ACTIONS
                && GRID_ACTIONS.menu
                && GRID_ACTIONS.menu.length > 0) {
                cells.splice(1, 0, this.getEmptyCell());
            }

            else {
                cells.push(this.getEmptyCell());
            }
        }

    }

    getEmptyCell() {

        const cellProps = {
            style: {
                width: '100%'
            }
        };

        return (
            <Cell { ...cellProps } />
        );
    }

    getCellData(columns, row, key, index) {
        // if dataIndex has been provided
        // return the obj[dataIndex]
        if (row
            && columns[index]
            && columns[index].dataIndex) {
            return row[columns[index].dataIndex];
        }

        // else just return the item at that index
        return row[key];
    }

    getRowComponents(row, events, selectedRows, columns) {

        const { selectionModel, columnManager, editorState } = this.props;
        const id = keyFromObject(row);
        const visibleColumns = columns.filter((col) => !col.hidden);

        const cells = Object.keys(row).map((k, i) => {

            const cellProps = {
                index: i,
                rowId: id,
                cellData: this.getCellData(columns, row, k, i),
                columns,
                key: keyGenerator(k),
                events: events
            };

            return <Cell { ...cellProps } />;

        });

        const isSelected = selectedRows ? selectedRows[id] : false;

        const editClass = editorState
            && editorState.row
            && editorState.row.key === id
            ? selectionModel.defaults.editCls
            : '';

        const selectedClass = isSelected ? selectionModel.defaults.activeCls : '';

        const rowProps = {
            key: id,
            className: prefix(CLASS_NAMES.ROW, selectedClass, editClass),
            onClick: this.handleRowSingleClickEvent.bind(this, events, row, id),
            onDoubleClick: this.handleRowDoubleClickEvent.bind(this, events, row, id)
        };

        columnManager.addActionColumn(cells, 'row', id);

        selectionModel.updateCells(cells, id, 'row');

        this.addEmptyInsert(cells, visibleColumns);

        return (
            <tr { ...rowProps }>
                { cells }
            </tr>
        );
    }

    handleRowDoubleClickEvent(events, rowData, rowId, reactEvent, id, browserEvent) {

        const { selectionModel } = this.props;

        if (selectionModel
                && selectionModel.defaults.selectionEvent === selectionModel.eventTypes.doubleclick) {

            selectionModel.handleSelectionEvent({
                eventType: reactEvent.type,
                eventData: reactEvent,
                id: rowId
            });
        }

        if (events.HANDLE_ROW_DOUBLE_CLICK) {
            events.HANDLE_ROW_DOUBLE_CLICK.call(this, rowData, rowId, reactEvent, id, browserEvent);
        }
    }

    handleRowSingleClickEvent(events, rowData, rowId, reactEvent, id, browserEvent) {

        const { selectionModel } = this.props;

        if (selectionModel
                && selectionModel.defaults.selectionEvent === selectionModel.eventTypes.singleclick) {

            selectionModel.handleSelectionEvent({
                eventType: reactEvent.type,
                eventData: reactEvent,
                id: rowId
            });
        }

        if (events.HANDLE_ROW_CLICK) {
            events.HANDLE_ROW_CLICK.call(this, rowData, rowId, reactEvent, id, browserEvent);
        }
    }

    getRowSelection(dataSource, pageIndex, pageSize, pager, plugins) {

        if (!dataSource) {
            return false;
        }

        if (!plugins.PAGER
            || !plugins.PAGER.enabled
            || plugins.PAGER.pagingType === 'remote') {
            return dataSource.data;
        }

        return getCurrentRecords(dataSource, pageIndex, pageSize);
    }

    getRows(rows, events, selectedRows, columns) {
        return Array.isArray(rows) ? rows.map((row) =>
            this.getRowComponents(row, events, selectedRows, columns)) : null;
    }

    render() {

        const {
            columns,
            events,
            plugins,
            pageSize,
            pager,
            dataSource,
            store,
            selectedRows
        } = this.props;

        const pageIndex = pager && pager.pageIndex ? pager.pageIndex : 0;

        const rows = this.getRowSelection(dataSource, pageIndex, pageSize, pager, plugins, store);

        const rowComponents = this.getRows(rows, events, selectedRows, columns);

        const rowInsert = rowComponents ? rowComponents : this.getPlaceHolder();

        return (
            <tbody>
                { rowInsert }
            </tbody>
        );
    }
}

function mapStateToProps(state) {
    return {
        dataSource: stateGetter(state, 'dataSource', 'gridData'),
        pager: stateGetter(state, 'pager', 'pagerState'),
        selectedRows: stateGetter(state, 'selection', 'selectedRows'),
        editorState: stateGetter(state, 'editor', 'editorState')
    };
}

export default connect(mapStateToProps)(Row);