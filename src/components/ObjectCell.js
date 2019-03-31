import React from 'react';
import PropTypes from 'prop-types';

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
import '@vkontakte/vkui/dist/vkui.css';

import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';


const osname = platform();

class ObjectCell extends React.Component {

    constructor (props) {
        super(props);
    }

    componentDidMount() {
    }



    render() {
        const { item, categoriesTypeId, oneString, viewType, notAvatar } = this.props;

        //console.log('ObjectCell', this.props)

        let style = oneString === true ? {
            textOverflow: 'ellipsis',
            overflow:     'hidden',
        } : null;

        let avatarStyle = {
            backgroundSize:     'cover',
            //backgroundImage:    'url(' + getImageSrc(item) + ')',
            backgroundPosition: 'center 35%'
        };


        return (
            <Group style={{margin: 0}}
                description={
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ marginRight: 'auto' }}>31 апреля</div>
                    <div><Link onClick={() => console.log('LINK')}>Контакты</Link></div>
                    <div style={{ marginLeft: 16 }}><Link onClick={() => console.log('LINK')}>Отлкикнуться</Link></div>
                </div>
            }>
            <Cell
                // onClick={() => console.log('CELL')}
                // onclick="event.stopPropagation()"
                description={
                    <div style={{marginTop: '2px'}}>

                            <div style={{display: 'flex'}}>
                                <Icon16Recent style={{marginRight: '4px'}}/>
                                <div style={style}>{item.snippet.requirement}</div>
                            </div>


                            <div style={{ display: 'flex', marginTop: '4px' }}>
                                <Icon16Place style={{ marginRight: '4px' }}/>
                                <div style={style}>{item.snippet.responsibility}</div>
                            </div>


                            <div style={{ display: 'flex', marginTop: '4px' }}>
                                <Icon16Recent style={{ marginRight: '4px' }}/>
                                <div style={style}>{item.salary && item.salary.from}</div>
                            </div>

                            <div style={{ display: 'flex', marginTop: '4px' }}>
                                <Icon16Place style={{ marginRight: '4px' }}/>
                                <div style={style}>{item.salary && item.salary.to}</div>
                            </div>

                        <div style={{ display: 'flex', marginTop: '4px' }}>
                            <Icon16Place style={{ marginRight: '4px' }}/>
                            <div style={style}>{item.employer.name}</div>
                        </div>
                        <div style={{ display: 'flex', marginTop: '4px' }}>
                            <Icon16Place style={{ marginRight: '4px' }}/>
                            <div style={style}>{item.published_at}</div>
                        </div>
                        {/*<div style={{display: 'flex', flexDirection: 'row'}}>*/}
                            {/*<Link onClick={() => console.log('LINK')}>Контакты</Link>*/}
                            {/*<Link onClick={() => console.log('LINK')}>Контакты</Link>*/}
                        {/*</div>*/}
                    </div>
                }
                // before={notAvatar === true ? null :
                //     <Avatar
                //         style={avatarStyle}
                //         type="image"
                //         // src={this.imageSrc}
                //         size={80}
                //     />
                // }
                // bottomContent={
                //     <div style={{display: 'flex', flexDirection: 'row'}}>
                //         {/*<Link tagName={'input'} onclick="event.stopPropagation()">Контакты</Link>*/}
                //         <Link tagName={'input'} onClick={() => console.log('LINK')}>Контакты</Link>
                //     </div>
                // }
                size="l"
                multiline={oneString !== true}
                onClick={(e) => {
                    this.props.onClick(e);
                }}
                data-to={this.props.dataToGo}
            >
                {item.name}
            </Cell>
            </Group>
        );

    }
}

ObjectCell.propTypes = {
    // item: PropTypes.object.isRequired,
    // categoriesTypeId: PropTypes.string.isRequired,
    // dataToGo: PropTypes.string.isRequired,
    // onClick: PropTypes.func.isRequired,
};

export default ObjectCell;
