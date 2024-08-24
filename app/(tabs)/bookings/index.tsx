import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import StyledText from '@/components/StyledText'
import { Colors } from '@/constants/Colors'

export default function index() {
  return (
    <SafeAreaView style={styles.container}>
      <StyledText>Bookings</StyledText>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background
    }
})