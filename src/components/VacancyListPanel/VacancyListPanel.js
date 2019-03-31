import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Actions from './actions'
import VacancyPanelActions from '../VacancyPanel/actions';
// import EventPanelActions from '../EventPanel/actions'
// import PlacePanelActions from '../PlacePanel/actions'
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
//import InfiniteScroll from 'react-infinite-scroll-component';
// import connect from '@vkontakte/vkui-connect';
import PanelSpinner from '@vkontakte/vkui/dist/components/PanelSpinner/PanelSpinner';

import {
    HeaderButton,
    Spinner,
    Footer,
    ListItem,
    Textarea,
    Radio,
    Checkbox,
    Button,
    FormLayout,
    Input,
    FormLayoutGroup,
    Select,
    List,
    Cell,
    Search,
    FixedLayout,
    Tabs,
    TabsItem,
    Epic,
    Tabbar,
    TabbarItem,
    Link,
    Group,
    Panel,
    PanelHeader,
    View,
    Avatar,
    HorizontalScroll,
    Header,
    PopoutWrapper,
    Div,
    ActionSheet,
    ActionSheetItem,
    platform,
    CellButton,
    IOS,
    Gallery
} from '@vkontakte/vkui';
import Icon24User from '@vkontakte/icons/dist/24/users';
import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed';
import Icon28Search from '@vkontakte/icons/dist/28/search';
import Icon28Notifications from '@vkontakte/icons/dist/28/notifications';
import Icon28Messages from '@vkontakte/icons/dist/28/messages';
import Icon28More from '@vkontakte/icons/dist/28/more';
import Icon24Globe from '@vkontakte/icons/dist/24/globe';
import Icon16Place from '@vkontakte/icons/dist/16/place';
import Icon16Dropdown from '@vkontakte/icons/dist/16/dropdown';
import Icon24Dropdown from '@vkontakte/icons/dist/24/dropdown';
import Icon24MoreHorizontal from '@vkontakte/icons/dist/24/more_horizontal';
import Icon24Search from '@vkontakte/icons/dist/24/search';
import Icon24Filter from '@vkontakte/icons/dist/24/filter';
import Icon16Recent from '@vkontakte/icons/dist/16/recent';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import '@vkontakte/vkui/dist/vkui.css';

// import ObjectGroup from '../ObjectGroup'
// import PlaceCell from '../PlaceCell'
import ObjectCell from '../ObjectCell'
// import AppActions from '../../containers/App/actions';
//import GalleryItem from '../GalleryItem';

import { getData } from './selectors'

const osname = platform();

class VacancyListPanel extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            activeStory: 'more',
            activePanel: 'home',
            activeTab: 'groups',
            search: '',

            data: [],
        };
    }

    componentDidMount() {
        const { actions, isCanFetchData } = this.props;
        console.log('componentDidMount')
        actions.fetchData();
        // if(isCanFetchData) {
        // }
    }

    go = (e) => {
        this.setState({ activePanel: e.currentTarget.dataset.to });
    };



    render() {
        const { id, data, count, cityId, eventTypeId, placeTypeId, categoriesTypeId, dataTop, countTop } = this.props;

        //console.log('EventListPanel RENDER', this.props)

        let style = {
            backgroundImage: `url('https://kudago.com/media/images/event/04/e1/04e1235948eef60ddc0e29993f7a5c5d.jpg')`,
            backgroundSize:  'cover'
        };

        return (
            <Panel id={id}>
                <PanelHeader>
                    Поиск работы
                </PanelHeader>

                <PanelSpinner />

                <Group description={<Link onClick={() => console.log('LINK')}>Контакты</Link>}>
                    <List>
                        <Cell>
                            One
                        </Cell>
                        <Cell>
                            Two
                        </Cell>
                        <Cell>
                            Three
                        </Cell>
                    </List>
                </Group>

                <Group>
                    <Header level="2">Вакансии {count}</Header>
                    {/*{!this.props.isLoading && (*/}
                        <List>
                            <InfiniteScroll
                                pageStart={0}
                                loadMore={() => {
                                    //this.props.actions.setPage(this.props.page+1);
                                    this.props.actions.fetchData();
                                    //this.props.actions.fetchDataMore();
                                }}
                                hasMore={this.props.hasMoreItems}
                                initialLoad={false}
                            >
                                {data.map((item, index) => {
                                    return (
                                        <ObjectCell
                                            viewType={this.props.viewType}
                                            // key={item.id}
                                            item={item}
                                            categoriesTypeId={categoriesTypeId}
                                            onClick={(e) => {
                                                console.log('LOL123', e)
                                                // this.props.actionsEventPanel.setEventId(item.id);
                                                // this.props.actionsEventPanel.setBackPanel('EventListPanel');
                                                this.props.actionsVacancyPanel.setPlaceId(item.id);
                                                // this.props.actionsVacancyPanel.setPlaceId(30752522);
                                                this.props.go(e);
                                            }}
                                            dataToGo={'VacancyPanel'}
                                        />
                                    );
                                })}
                            </InfiniteScroll>
                        </List>
                    {/*)}*/}
                </Group>
            </Panel>
        );
    }
}

const mapStateToProps = store => {
    return {
        data: store.vacancyListPanel.data,
        count: store.vacancyListPanel.count,
        isLoading: store.vacancyListPanel.isLoading,
        isHasError: store.vacancyListPanel.isHasError,
        hasMoreItems: store.vacancyListPanel.hasMoreItems,
        page: store.vacancyListPanel.page,
        // isCanFetchData: store.eventListPanel.isCanFetchData,

        // nextPage: store.eventListPanel.nextPage,
        // isLoading: store.eventListPanel.isLoading,

        //
        // cityId: store.appPanel.cityId,
        // eventTypeId: store.appPanel.eventTypeId,
        // placeTypeId: store.appPanel.placeTypeId,
        // categoriesTypeId: store.appPanel.categoriesTypeId,

    }
};

export default connect(
    mapStateToProps,
    (dispatch) => {
        return {
            actions: bindActionCreators(Actions, dispatch),
            actionsVacancyPanel: bindActionCreators(VacancyPanelActions, dispatch),
            // actionsEventPanel: bindActionCreators(EventPanelActions, dispatch),
            // actionsPlacePanel: bindActionCreators(PlacePanelActions, dispatch),
            // actionsApp: bindActionCreators(AppActions, dispatch),
        }
    }
)(VacancyListPanel);
