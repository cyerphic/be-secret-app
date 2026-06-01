import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  LayoutAnimation
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Appbar, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import KeyList from '../components/KeyList';
import KeyInput from '../components/KeyInput';
import usePrivateKey from '../hooks/usePrivateKey';

export default function PrivateKeyScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const { 
    key, 
    keyLength, 
    refreshKey, 
    handleAutoSaveKey,
    handleManualSaveKey, 
    refreshKeyList, 
    triggerListRefresh,
    activeTab,
    setActiveTab,
    keyInputVisible,
    setKeyInputVisible 
  } = usePrivateKey();

  const textColor = '#1c1c1e';
  const subTextColor = '#8e8e93';

  const toggleInput = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setKeyInputVisible(!keyInputVisible);
  };

  return (
    <View style={[styles.page, { backgroundColor: colors.surfaceVariant }]}>
      <Appbar.Header style={{ backgroundColor: colors.surfaceVariant }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content 
          title="Settings" 
          titleStyle={{ fontSize: 18 }}
        />
      </Appbar.Header>

      <KeyboardAwareScrollView 
        style={styles.container} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bottomOffset={20}
        keyboardShouldPersistTaps="handled"
      >
        
        {/* Password Display Card */}
        <View style={styles.card}>
          <View style={styles.passwordHeader}>
            <Text style={key ? styles.passwordText : styles.tipsText}>
              {key ? key : 'press sync icon to generate a new private key.'}
            </Text>
          </View>

          {/* Strength Bar */}
          <View style={styles.dashLine} />

          <View style={styles.strengthFooter}>
            <Text style={styles.lengthInfoText}>{keyLength} characters</Text>
            <View style={styles.strengthStatus}>
              <TouchableOpacity style={styles.iconBtn} onPress={refreshKey}>
                <Ionicons name="sync" size={24} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconBtn} onPress={handleAutoSaveKey}>
                <Ionicons name="save-outline" size={24} />
              </TouchableOpacity>
            </View>
          </View>

        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'auto' && styles.activeTab]}
            onPress={() => setActiveTab('auto')}
          >
            <Text style={[styles.tabText, activeTab === 'auto' && styles.activeTabText]}>
              History
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'manual' && styles.activeTab]}
            onPress={() => setActiveTab('manual')} 
          >
            <Text style={[styles.tabText, activeTab === 'manual' && styles.activeTabText]}>
              Manual Input
            </Text>
          </TouchableOpacity>
        </View>

        {/* History List */}
        <View style={styles.keyContainer}>
          <KeyList
            //key={activeTab}
            tabType={activeTab} 
            refreshToken={refreshKeyList}
            onKeyChanged={triggerListRefresh}
          />
        </View>

        {/* Manual Entry Button */}
        <TouchableOpacity 
          style={[styles.manualEntryCard, keyInputVisible && styles.manualEntryCardExpanded]} 
          onPress={toggleInput} 
          activeOpacity={0.7}
        >
          <Feather name="edit-2" size={20} color={textColor} style={styles.manualIcon} />
          <Text style={styles.manualEntryText}>Enter a password manually</Text>
          <Ionicons 
            name={keyInputVisible ? "chevron-down" : "chevron-forward"} 
            size={20} 
            color={subTextColor} 
          />
        </TouchableOpacity>

        {/* manual key input */}
        {keyInputVisible && (
          <View style={styles.keyInputContainer}>
            <KeyInput onSave={handleManualSaveKey} />
          </View>
        )}

        {/* Footer Note */}
        <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
          <MaterialCommunityIcons name="shield-check-outline" size={28} color={colors.primaryGreen} style={styles.footerIcon} />
          <Text style={styles.footerText}>
            Your passwords are generated on your device and never stored anywhere.
          </Text>
        </View>
        
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#f4f5f9',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  passwordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  passwordText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'monospace',
    color: '#28a745',
    lineHeight: 24,
    marginRight: 10,
  },
  iconBtn: {
    padding: 4,
  },
  strengthFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  strengthStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  tipsText: {
    color: '#8e8e93',
    fontSize: 16,
    lineHeight: 26,
  },
  lengthInfoText: {
    color: '#8e8e93',
    fontSize: 13,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#28a745',
  },
  tabText: {
    fontSize: 15,
    color: '#8e8e93',
  },
  dashLine: {
    width: '100%',
    alignSelf: 'center',
    height: 1,
    borderWidth: 0.6,
    borderColor: '#E8E8E8',
    borderStyle: 'dashed',
    marginVertical: 14,
  },
  activeTabText: {
    color: '#28a745',
    fontWeight: '500',
  },
  keyContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingTop: 8,
    marginBottom: 16,
  },
  manualEntryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 24,
  },
  manualEntryCardExpanded: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 0, 
    backgroundColor: '#ffffff',
    marginBottom: 0, 
  },
  manualIcon: {
    marginRight: 12,
  },
  manualEntryText: {
    flex: 1,
    fontSize: 16,
    color: '#1c1c1e',
  },
  keyInputContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopWidth: 0,
    marginBottom: 24,
    overflow: 'hidden',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
  },
  footerIcon: {
    marginRight: 12,
    marginTop: -2,
  },
  footerText: {
    flex: 1,
    fontSize: 13,
    color: '#8e8e93',
    lineHeight: 18,
  }
});