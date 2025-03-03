import React from 'react';
import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      {/* Title Section */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">About SALU</ThemedText>
      </ThemedView>

      <ThemedText style={styles.introText}>
        SALU is a Digital Intelligent Health Assistant designed to enhance healthcare access and delivery.
      </ThemedText>

      {/* Features Section */}
      <Collapsible title="Medical Test Explanation">
        <ThemedText>
          Automatically interpret and explain medical test results to patients in simple terms.
        </ThemedText>
        <ExternalLink href="https://sites.google.com/view/subratkumardang/projects/ongoing?authuser=0">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Personalized Health Guidance">
        <ThemedText>
          Provide tailored dietary recommendations and health tips based on diagnostic data.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Doctor and Health Service Locator">
        <ThemedText>
          Help users find nearby healthcare providers and practitioners, including specialists and local clinics. 
          The system maintains an updated database of doctors, ensuring patients can find practitioners even if they relocate.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Telemedicine Assistance">
        <ThemedText>
          Connect patients with doctors during emergencies through telemedicine features like video calling or secure messaging. 
          Notify nearby doctors or clinics about emergency cases in real-time.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Multilingual Communication">
        <ThemedText>
          Break the language barrier by translating healthcare information into regional languages, 
          enabling rural users to access medical guidance in their preferred language.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Health Literacy and Awareness Campaigns">
        <ThemedText>
          Educate users by providing accessible health literacy resources, including audio-visual content about preventive healthcare and available government schemes. 
          Advertise public health services through the assistant.
        </ThemedText>
        {Platform.select({
          ios: (
            <ThemedText>
              The <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText> component provides a parallax effect for the header image.
            </ThemedText>
          ),
        })}
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    position: 'absolute',
    bottom: -90,
    left: -35,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  introText: {
    marginVertical: 16,
    fontSize: 16,
    textAlign: 'center',
  },
});
