import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Actions from './actions'
import axios from 'axios';
// import connect from '@vkontakte/vkui-connect';

import {
    InfoRow,
    HeaderButton,
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
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon24Place from '@vkontakte/icons/dist/24/place';
import Icon24Phone from '@vkontakte/icons/dist/24/phone';
import Icon24Home from '@vkontakte/icons/dist/24/home';
import Icon24Pin from '@vkontakte/icons/dist/24/pin';
import Icon24Dropdown from '@vkontakte/icons/dist/24/dropdown';
import '@vkontakte/vkui/dist/vkui.css';

//import ObjectGroup from '../ObjectGroup'
//import PlaceCell from '../PlaceCell'
//import MapPanelActions from '../MapPanel/actions';
//import { capitalize, getImageSrcByIndex, renderData } from '../../utils/utils';

const osname = platform();

class EmployerPanel extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            activeStory: 'more',
            activePanel: 'home',
            activeTab: 'groups',
            search: '',

            data: [],
            dropdown: true,
        };
    }

    componentDidMount() {
        const { actions, placeId } = this.props;
        actions.fetchData(placeId);
    }
    //
    // createMarkup(html) {
    //     return { __html: html };
    // };
    //
    // renderDate() {
    //     const { data } = this.props;
    //     return (
    //         <div>
    //             {data.dates && new Date(data.dates[data.dates.length-1].start_date).toLocaleString("ru", {day: 'numeric', month: 'long' })}
    //             -
    //             {data.dates && new Date(data.dates[data.dates.length-1].end_date).toLocaleString("ru", {day: 'numeric', month: 'long', year: 'numeric' })}
    //         </div>
    //     );
    // }


    // get otherPropsAddress() {
    //     const { data } = this.props;
    //
    //     let otherPropsAddress = null;
    //     if (data.address !== null) {
    //         otherPropsAddress = {
    //             expandable: true,
    //             onClick:    (e) => {
    //                 this.props.actionsMapPanel.setPlaces([data]);
    //                 this.props.actionsMapPanel.setBackPanel('PlacePanel');
    //                 this.props.go(e);
    //             }
    //         };
    //     }
    //
    //     return otherPropsAddress;
    // }

    renderSalary() {
        const { salary } = this.props.data;

        if(!salary) {
            return null;
        }

        const { from, to, gross, currency } = salary;

        let res = '';
        if(from && to) {
            res = `от ${from} до ${to}`;
        }
        if(from && !to) {
            res = `от ${from}`;
        }
        if(!from && to) {
            res = `до ${to}`;
        }

        res += ` ${currency}`;

        res += gross ? ' до вычета НДФЛ' : ' на руки';

        return res;
    }

    renderAddress() {
        const { address } = this.props.data;

        if(!address) {
            return null;
        }

        const { city, street, building, raw } = address;

        // if(raw) {
        //     return raw;
        // }

        let res = [];
        if(city) {
            res.push(city);
        }
        if(street) {
            res.push(street);
        }
        if(building) {
            res.push(building);
        }

        return res.join(', ');
    }

    renderEmploymentAndSchedule() {
        const { employment, schedule } = this.props.data;
        let res = [];

        if(employment) {
            res.push(employment.name);
        }
        if(schedule) {
            res.push(schedule.name);
        }

        return res.join(', ');
    }

    createMarkup(html) {
        return { __html: html };
    };

    getImage(data) {
        if(!data.logo_urls) {
            return null;
        }

        if(data.logo_urls) {
            if(data.logo_urls['90']) {
                return data.logo_urls['90']
            }
            if(data.logo_urls['240']) {
                return data.logo_urls['240']
            }
            if(data.logo_urls['original']) {
                return data.logo_urls['original']
            }
            return null;
        }
    }

    render() {
        const { id, data } = this.props;

        //console.log('PlacePanel', this.props)

        let style = {
            maxHeight: this.state.dropdown === true ? '150px' : '',
            overflow: 'hidden',
        };

        let style2 = {
            margin: 'auto',
            transform: this.state.dropdown === true ? '' : 'rotate(180deg)',
        };


        let styleImg = {
            backgroundImage: 'url(' + this.getImage(data) + ')',
            backgroundSize: 'cover',
            backgroundPosition: '50% 50%',
        };

        return (
            <Panel id={id}>
                <PanelHeader
                    noShadow
                    left={
                        <HeaderButton
                            onClick={(e) => {
                                this.props.actions.clearData();
                                this.props.go(e);
                            }}
                            // data-to={this.props.backPanel ? this.props.backPanel : this.props.back}
                            data-to={'VacancyPanel'}
                        >
                            {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                        </HeaderButton>
                    }
                >
                    О компании
                </PanelHeader>
                <Group>
                    <Header>{data.name}</Header>
                    <Div>
                        {data.trusted ? 'Проверенный работодатель' : 'Непроверенный работодатель'}
                        <p>{data.site_url ? <Link>{data.site_url}</Link> : null}</p>
                    </Div>
                </Group>
                <Group>
                    <List>
                        <Cell
                            before={<Icon24Home/>}
                            multiline
                            expandable
                            onClick={(e) => {
                                this.props.actions.clearData();
                                this.props.go(e);
                            }}
                            data-to={this.props.backPanel || this.props.back}
                        >
                            Вакансии компании
                        </Cell>
                    </List>
                </Group>
                {/*<div style={styleImg}/>*/}
                <div>
                    <img style={{ display: 'flex', margin: 'auto' }} src={this.getImage(data)}/>
                </div>
                <Group>
                    <Div>
                        <div dangerouslySetInnerHTML={this.createMarkup(data.branded_description ? data.branded_description : data.description)} />
                    </Div>
                </Group>

                {/*/!*<Group style={{marginTop: 0}}>*!/*/}
                    {/*/!*<Gallery*!/*/}
                        {/*/!*slideWidth="100%"*!/*/}
                        {/*/!*style={{ height: 230 }}*!/*/}
                        {/*/!*bullets="light"*!/*/}
                    {/*/!*>*!/*/}
                        {/*/!*{data.images.map((image, index) => {*!/*/}
                            {/*/!*let style = {*!/*/}
                                {/*/!*backgroundImage: 'url(' + getImageSrcByIndex(data, index, 'm') + ')',*!/*/}
                                {/*/!*backgroundSize: 'cover',*!/*/}
                                {/*/!*backgroundPosition: '50% 50%',*!/*/}
                            {/*/!*};*!/*/}
                            {/*/!*return (*!/*/}
                                {/*/!*<div key={index} style={style}/>*!/*/}
                            {/*/!*);*!/*/}
                        {/*/!*})}*!/*/}
                    {/*/!*</Gallery>*!/*/}
                {/*/!*</Group>*!/*/}
                {/*<Group>*/}
                    {/*<Header>*/}
                        {/*/!*{capitalize(data.title)}*!/*/}
                    {/*</Header>*/}
                    {/*<Div style={{paddingTop: 0}}>*/}
                        {/*/!*<div dangerouslySetInnerHTML={this.createMarkup(data.description)} />*!/*/}
                    {/*</Div>*/}
                {/*</Group>*/}
                {/*<Group>*/}
                    {/*<Div>*/}
                        {/*<InfoRow title="Расписание работы">*/}
                            {/*/!*{renderData(data.timetable)}*!/*/}
                        {/*</InfoRow>*/}
                    {/*</Div>*/}
                {/*</Group>*/}
                {/*<Group title="Контакты">*/}
                    {/*<List>*/}
                        {/*<Cell*/}
                            {/*multiline*/}
                            {/*before={<Icon24Place />}*/}
                            {/*data-to={'MapPanel'}*/}
                        {/*>*/}
                            {/*<InfoRow title="Адрес">*/}
                                {/*/!*{renderData(data.address)}*!/*/}
                            {/*</InfoRow>*/}
                        {/*</Cell>*/}
                        {/*/!*{data.subway && (*!/*/}
                        {/*<Cell before={<Icon24Pin/>} multiline>*/}
                            {/*<InfoRow title="Ближайшее метро">*/}
                                {/*/!*{renderData(data.subway)}*!/*/}
                            {/*</InfoRow>*/}
                        {/*</Cell>*/}
                        {/*/!*)}*!/*/}
                        {/*<Cell before={<Icon24Phone />} multiline>*/}
                            {/*<InfoRow title="Номер телефона">*/}
                                {/*/!*{renderData(data.phone)}*!/*/}
                            {/*</InfoRow>*/}
                        {/*</Cell>*/}
                        {/*/!*{data.foreign_url &&*!/*/}
                        {/*<Cell*/}
                            {/*before={<Icon24Home/>}*/}
                            {/*expandable={true}*/}
                            {/*// href={data.foreign_url}*/}
                            {/*target="_blank"*/}
                        {/*>*/}
                            {/*Перейти на сайт*/}
                        {/*</Cell>*/}
                        {/*/!*}*!/*/}
                    {/*</List>*/}
                {/*</Group>*/}
                {/*<Group title="Описание">*/}
                    {/*<Div style={style}>*/}
                        {/*/!*<div dangerouslySetInnerHTML={this.createMarkup(data.body_text)} />*!/*/}
                    {/*</Div>*/}

                    {/*<Cell onClick={()=>this.setState({dropdown: !this.state.dropdown})}>*/}
                        {/*<Icon24Dropdown style={style2}/>*/}
                    {/*</Cell>*/}
                {/*</Group>*/}
                {/*/!*{data.site_url &&*!/*/}
                    {/*<Group>*/}
                        {/*<Cell*/}
                            {/*expandable={true}*/}
                            {/*href={data.site_url}*/}
                            {/*target="_blank"*/}
                        {/*>*/}
                            {/*/!*<Link href={data.site_url}>Источник данных</Link>*!/*/}
                            {/*Источник данных*/}
                        {/*</Cell>*/}
                    {/*</Group>*/}
                {/*/!*}*!/*/}
            </Panel>
        );
    }
}

const mapStateToProps = store => {
    return {
        placeId: store.employerPanel.placeId,
        data: store.employerPanel.data,
        //backPanel: store.vacancyPanel.backPanel,
    }
};

export default connect(
    mapStateToProps,
    (dispatch) => {
        return {
            actions: bindActionCreators(Actions, dispatch),
            //actionsMapPanel: bindActionCreators(MapPanelActions, dispatch),
        }
    }
)(EmployerPanel);
