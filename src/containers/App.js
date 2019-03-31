import React from 'react';
import connect from '@vkontakte/vkui-connect';
import {
    ScreenSpinner,
    InfoRow,
    Root,
    Gallery,
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
    Alert
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed';
import Icon28Search from '@vkontakte/icons/dist/28/search';
import Icon28Place from '@vkontakte/icons/dist/28/place';
import Icon28Video from '@vkontakte/icons/dist/28/video';
import Icon28Notifications from '@vkontakte/icons/dist/28/notifications';
import Icon28Messages from '@vkontakte/icons/dist/28/messages';
import Icon24MoreHorizontal from '@vkontakte/icons/dist/24/more_horizontal';
import Icon28More from '@vkontakte/icons/dist/28/more';

// import Home from './panels/Home';
// import Persik from './panels/Persik';

import VacancyListPanel from '../components/VacancyListPanel/VacancyListPanel';
import VacancyPanel from '../components/VacancyPanel/VacancyPanel';
import EmployerPanel from '../components/EmployerPanel/EmployerPanel';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
            activeStory: 'more',
			activePanel: 'VacancyListPanel',
			fetchedUser: null,
		};

        this.onStoryChange = this.onStoryChange.bind(this);
	}

    onStoryChange (e) {
        this.setState({ activeStory: e.currentTarget.dataset.story })
    }

	componentDidMount() {
		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					this.setState({ fetchedUser: e.detail.data });
					break;
				default:
					console.log(e.detail.type);
			}
		});
		connect.send('VKWebAppGetUserInfo', {});
	}

	go = (e) => {
	    console.log('123123123', e.currentTarget.dataset.to)
		this.setState({ activePanel: e.currentTarget.dataset.to })
	};

	render() {
		// return (
		// 	<View activePanel={this.state.activePanel}>
		// 		<Home id="home" fetchedUser={this.state.fetchedUser} go={this.go} />
		// 		<Persik id="persik" go={this.go} />
		// 	</View>
		// );
        return (
            <Epic activeStory={this.state.activeStory} tabbar={
                <Tabbar>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'feed'}
                        data-story="feed"
                        text="Новости"
                    ><Icon28Newsfeed /></TabbarItem>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'discover'}
                        data-story="discover"
                        text="Поиск"
                    ><Icon28Search /></TabbarItem>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'messages'}
                        data-story="messages"
                        label="12"
                        text="Сообщения"
                    ><Icon28Messages /></TabbarItem>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'notifications'}
                        data-story="notifications"
                        text="Уведомлен."
                    ><Icon28Notifications /></TabbarItem>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'more'}
                        data-story="more"
                        text="Ещё"
                    ><Icon28More /></TabbarItem>
                </Tabbar>
            }>
                <View id="feed" activePanel={this.state.activePanel}>
                    <VacancyListPanel id="VacancyListPanel" go={this.go}/>
                    <VacancyPanel id="VacancyPanel" go={this.go}/>
                    <EmployerPanel id="EmployerPanel" go={this.go}/>
                </View>
                <View id="discover" activePanel="discover">
                    <Panel id="discover">
                        <PanelHeader>Discover</PanelHeader>
                    </Panel>
                </View>
                <View id="messages" activePanel="messages">
                    <Panel id="messages">
                        <PanelHeader>Messages</PanelHeader>
                    </Panel>
                </View>
                <View id="notifications" activePanel="notifications">
                    <Panel id="notifications">
                        <PanelHeader>Notifications</PanelHeader>
                    </Panel>
                </View>
                <View id="more" activePanel="more">
                    <Panel id="more">
                        <PanelHeader>More</PanelHeader>
                    </Panel>
                </View>
            </Epic>
        )
	}
}

export default App;
