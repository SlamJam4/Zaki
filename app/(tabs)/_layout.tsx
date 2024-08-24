import { StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';

import StyledText from '@/components/StyledText';
import { Colors } from '@/constants/Colors';

import ExploreIcon from '@/assets/icons/explore.svg';
import ExploreIconOutline from '@/assets/icons/explore-outline.svg';
import SearchIcon from '@/assets/icons/search.svg';
import SearchIconOutline from '@/assets/icons/search-outline.svg';
import BookingsIcon from '@/assets/icons/bookings.svg';
import BookingsIconOutline from '@/assets/icons/bookings-outline.svg';
import ProfileIcon from '@/assets/icons/profile.svg';
import ProfileIconOutline from '@/assets/icons/profile-outline.svg';

const tabsConfig = {
  explore: {
    title: 'Explore',
    Icon: ExploreIcon,
    OutlineIcon: ExploreIconOutline,
  },
  search: {
    title: 'Search',
    Icon: SearchIcon,
    OutlineIcon: SearchIconOutline,
  },
  bookings: {
    title: 'Bookings',
    Icon: BookingsIcon,
    OutlineIcon: BookingsIconOutline,
  },
  profile: {
    title: 'Profile',
    Icon: ProfileIcon,
    OutlineIcon: ProfileIconOutline,
  },
};


const styles = StyleSheet.create({
  tabBar: {
    height: 60, // Increase this value to raise the tab bar
    paddingBottom: 5, // Reduced padding at the bottom
  },
  tabBarLabel: {
    fontSize: 12, // Smaller font size for the label
    marginTop: 4, // Move the label down
  },
  tabBarItem: {
    paddingTop: 8, // Add padding to the top of the tab bar item
  },
});

export default function TabLayout() {
  return (
      <Tabs
        initialRouteName="explore/index"
        screenOptions={{
          tabBarInactiveTintColor: Colors.tabIconDefault,
          tabBarActiveTintColor: Colors.tabIconSelected,
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarItemStyle: styles.tabBarItem,
        }}
      >
        {Object.entries(tabsConfig).map(([name, config]) => (
          <Tabs.Screen
            key={name}
            name={`${name}/index`}
            options={{
              tabBarLabel: ({ focused }) => (
                <StyledText
                  bold={focused}
                  style={[
                    styles.tabBarLabel,
                    {
                      color: focused ? Colors.tabIconSelected : Colors.tabIconDefault,
                    },
                  ]}
                >
                  {config.title}
                </StyledText>
              ),
              tabBarIcon: ({ color, focused }) => {
                const IconComponent = focused ? config.Icon : config.OutlineIcon;
                return <IconComponent width={20} height={20} fill={color} />;
              },
            }}
          />
        ))}
      </Tabs>
  );
}